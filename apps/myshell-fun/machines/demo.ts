export async function retry(
    fn: () => Promise<any>,
    retries: number = 5
) {
    try {
        return await fn();
    } catch (e) {
        if (retries > 0) {
            console.log('Retrying...')
            return await retry(fn, retries - 1)
        }
        throw e
    }
}

retry(() => Promise.resolve("hello")).then(str => console.log(str))