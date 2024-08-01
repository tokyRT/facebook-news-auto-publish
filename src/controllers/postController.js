const Post = require('../models/Post');


const all = async (req, res) => {
    const posts = await Post.find({});
    return res.send(posts)
};

exports.all = all;

const find = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // if(!post) return res.status(404).send({message: "post not found"});
        if (post) {
            return res.send(post)
        } else {
            return res.status(404).send({ message: "post not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error });
    }

};

exports.find = find;


const store = async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    return res.json(post);
};

exports.store = store;

const update = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        if (!post) return res.status(404).send({ message: "post not found" });
        const body = req.body;

        post.title = body.title;
        post.body = body.body;

        await post.save();
        return res.send({ message: "Post updated successfully", post })
    } catch (error) {
        return res.status(403).send({ message: error.message });
    }

};

exports.update = update;

const destroy = async (req, res) => {
    try {
        const deleted = await Post.deleteOne({ _id: req.params.id });
        console.log(deleted);
        if (deleted) return res.send({ message: "Post deleted" });
        return res.status(404).send({ message: "Post not found" });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error });
    }
};

exports.destroy = destroy;