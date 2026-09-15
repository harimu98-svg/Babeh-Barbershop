// ============================================================
// NETLIFY FUNCTION - SENSENOVA U1.5 LITE
// TANPA DEPENDENCIES (pakai fetch native)
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
                    error: 'SENSENOVA_API_KEY tidak ditemukan. Set di Netlify Environment Variables.'
                })
            };
        }

        const prompt = `
        Ubah rambut pada foto pertama (selfie) dengan gaya rambut dari foto kedua (model ${modelName || 'rambut'}).

        BUATKAN 3 SUDUT PANDANG DALAM 1 GAMBAR:
        - Kiri: Tampak DEPAN
        - Tengah: Tampak SAMPING KANAN
        - Kanan: Tampak BELAKANG

        Setiap sudut harus menunjukkan orang yang SAMA dengan RAMBUT BARU.
        Pertahankan ekspresi wajah, warna kulit, dan gaya foto yang natural.
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

        console.log('📤 Mengirim ke SenseNova U1.5 Lite...');

        // Timeout 50s (di bawah batas 60s Netlify)
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
