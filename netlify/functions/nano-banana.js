// ============================================================
// NETLIFY FUNCTION - NANO BANANA 2 LITE (1 SUDUT: DEPAN)
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

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'GEMINI_API_KEY tidak ditemukan.'
                })
            };
        }

        const MODEL_NAME = 'gemini-3.1-flash-lite-image';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

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
            contents: [{
                parts: [
                    { text: prompt },
                    { inline_data: { mime_type: "image/jpeg", data: selfieBase64 } },
                    { inline_data: { mime_type: "image/jpeg", data: modelBase64 } }
                ]
            }],
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4096,
            }
        };

        console.log('📤 Mengirim ke Nano Banana (1 sudut depan)...');

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.error?.message || `HTTP ${response.status}`;
            console.error('❌ Nano Banana Error:', errorMsg);
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: errorMsg })
            };
        }

        console.log('✅ Nano Banana Response diterima');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('❌ Nano Banana Server Error:', error.message);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
