/**
 * There is no backend endpoint for actually sending mail, so delivery stays
 * mocked here — everything else on the contact page now comes from the BE.
 */
export async function sendResumeMail(request: ResumeRequest): Promise<ResumeDelivery> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    console.info("[contact] mock résumé mail", { to: request.email });

    return {
        id: `mock_${Date.now().toString(36)}`,
        to: request.email,
        delivered_at: new Date(),
    };
}
