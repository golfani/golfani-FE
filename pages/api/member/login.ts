import {NextApiRequest, NextApiResponse} from "next";

const loginApi = (req : NextApiRequest, res : NextApiResponse<string>) => {
    if(req.method == 'POST') {
        res.statusCode = 200;
        res.send(req.body.memberId);
        // res.statusCode = 409;
        // res.send("아이디, 비밀번호가 일치하지 않습니다.");
    }
}

export default loginApi;
