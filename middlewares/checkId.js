const checkPasteID = async (req, res, next) => {
    const { id } = req.params;
    if (id == null) {
        return res.status(400).json({ message: "id is required to find the paste!" });
    }
    next();
}

export { checkPasteID };

