import { constant } from './constants';
class Utils {
    async paginationFun(req, res, modelnameZ, eliminate, popArray) {
        let data = {};
        let query = req.query;
        let from = Number(query.from || 0);
        let to = Number(query.to || from + 10);
        delete query['from'];
        delete query['to'];
        await modelnameZ
            .find(query, eliminate)
            .sort('-_id')
            .populate(popArray)
            .skip(from)
            .limit(to)
            .then(async results => {
                let total = await modelnameZ.countDocuments(query);
                data = { data: results, total };
                res.status(200).json(data);
            });
    }
}

export = new Utils();
