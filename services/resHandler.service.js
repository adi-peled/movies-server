
export class ResService {
    static async handleErr(res, err) {
        res.send({ success: false, err });
    }

    static async handleSuccess(res, data) {
        res.send({ success: true, data });
    }
}
