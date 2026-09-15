// ============================================================
// NETLIFY FUNCTION - SENSENOVA U1.5 LITE (1 SUDUT: DEPAN)
// ============================================================

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { selfieBase64, modelBase64, modelName } = JSON.parse(event.body);

        if (!selfieBase64 || !modelBase64) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'selfieBase64 dan modelBase64 wajib diisi' })
            };
        }

        const API_KEY = process.env.SENSENOVA_API_KEY;
        if (!API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'SENSENOVA_API_KEY tidak ditemukan.'
                })
            };
        }

        const prompt = `
        Ubah rambut pada foto pertama (selfie) dengan gaya rambut dari foto kedua (model ${modelName || 'rambut'}).

        PENTING:
        - Tampilkan HANYA TAMPAK DEPAN (front view, wajah menghadap kamera langsung)
        - JANGAN buat multi-panel, JANGAN buat kolase, JANGAN buat sudut samping atau belakang
        - Hanya SATU gambar tunggal

        PERTAHANKAN dengan sangat ketat:
        - Wajah, ekspresi, bentuk wajah, warna kulit yang SAMA PERSIS
        - Ukuran wajah dan posisi kepala SAMA PERSIS seperti foto asli
        - Zoom, framing, dan komposisi SAMA PERSIS
        - Background dan pencahayaan SAMA PERSIS

        HANYA ubah rambutnya saja sesuai model dari foto kedua.
        Hasil harus NATURAL dan REALISTIS seperti foto asli.
        `;

        const payload = {
            model: 'sensenova-u1.5-lite',
            prompt: prompt,
            images: [
                { image_url: `data:image/jpeg;base64,${selfieBase64}` },
                { image_url: `data:image/jpeg;base64,${modelBase64}` }
            ],
            size: '1024x1024',
            watermark: false,
            output_format: 'jpeg',
            response_format: 'b64_json',
            prompt_extend: false,
            n: 1
        };

        console.log('📤 Mengirim ke SenseNova (1 sudut depan)...');

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 50000);

        const response = await fetch('https://token.sensenova.ai/v1/images/edits', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.error?.message || `HTTP ${response.status}`;
            console.error('❌ SenseNova Error:', errorMsg);
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: errorMsg })
            };
        }

        console.log('✅ SenseNova Response diterima');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {
        const isTimeout = error.name === 'AbortError';
        console.error('❌ SenseNova Server Error:', error.message);
        return {
            statusCode: isTimeout ? 504 : 500,
            headers,
            body: JSON.stringify({
                error: isTimeout ? 'SenseNova timeout (50s)' : error.message,
                isTimeout
            })
        };
    }
};
