// ============================================================
// NETLIFY FUNCTION - NANO BANANA 2 LITE
// TANPA DEPENDENCIES (pakai fetch native)
// ============================================================

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    // Handle preflight (OPTIONS)
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers };
    }

    // Hanya terima POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { selfieBase64, modelBase64, modelName } = JSON.parse(event.body);

        // Validasi input
        if (!selfieBase64 || !modelBase64) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'selfieBase64 dan modelBase64 wajib diisi' })
            };
        }

        // Ambil API key dari environment variable
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'GEMINI_API_KEY tidak ditemukan. Set di Netlify Environment Variables.'
                })
            };
        }

        const MODEL_NAME = 'gemini-3.1-flash-lite-image';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

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
            contents: [{
                parts: [
                    { text: prompt },
                    { inline_data: { mime_type: "image/jpeg", data: selfieBase64 } },
                    { inline_data: { mime_type: "image/jpeg", data: modelBase64 } }
                ]
            }],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 4096,
            }
        };

        console.log('📤 Mengirim ke Nano Banana 2 Lite...');

        // PAKAI FETCH NATIVE (Node.js 18+)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.error?.message || `HTTP ${response.status}`;
            console.error('❌ Error:', errorMsg);
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: errorMsg })
            };
        }

        console.log('✅ Response diterima');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('❌ Server Error:', error.message);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
