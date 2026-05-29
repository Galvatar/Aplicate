import { chromium } from 'playwright';

export async function fetchHtmlFromUrl(url: string): Promise<string> {
    const browser = await chromium.launch({
        headless: true
    });

    try {
        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        return await page.content();
    } finally {
        await browser.close();
    }
}