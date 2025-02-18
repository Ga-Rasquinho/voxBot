import Reuniao from '../model/reuniao.js';

export default {
    async create(req, res) {
        try {
            const reuniaoCriada = await Reuniao.create(req.body);
            const reuniao = await Reuniao.findById(reuniaoCriada._id).populate({
                path: 'organizador',
                select: 'nome email matricula'
            });
            return res.status(201).json(reuniao);
        } catch (err) {
            return res.status(400).json({ error: 'Error creating new Reuniao ' + err });
        }
    },
    async read(req, res) {
        try {
            const reunioes = await Reuniao.find().populate({
                path: 'organizador',
                select: 'nome email matricula'
            });;
            return res.status(200).json(reunioes);
        } catch (err) {
            return res.status(400).json({ error: 'Error fetching Reunioes' });
        }
    },
    async readOne(req, res) {
        try {
            const reuniao = await Reuniao.findById(req.params.id).populate({
                path: 'organizador',
                select: 'nome email matricula'
            });;
            return res.status(200).json(reuniao);
        } catch (err) {
            return res.status(400).json({ error: 'Error fetching Reuniao' });
        }
    },
    async update(req, res) {
        try {
            const reuniao = await Reuniao.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(reuniao);
        }
        catch (err) {
            return res.status(400).json({ error: 'Error updating Reuniao' });
        }
    },
    async delete(req, res) {
        try {
            await Reuniao.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'Reuniao deleted' });
        }
        catch (err) {
            return res.status(400).json({ error: 'Error deleting Reuniao' });
        }
    },
    async deleteAll(req, res) {
        try {
            await Reuniao.deleteMany();
            return res.status(200).json({ message: 'All Reunioes deleted' });
        }
        catch (err) {
            return res.status(400).json({ error: 'Error deleting Reunioes' });
        }
    }
};