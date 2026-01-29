const getPasteExpiry = (createdAt, TTLseconds) => {
    const dateCreated = new Date(createdAt);
    const expiresAt = new Date(dateCreated.getTime() + (TTLseconds * 1000));
    return expiresAt;
}

const isPasteExpired = (currentTime, expiresAt) => {
    return currentTime.getTime() >= expiresAt.getTime();
}

export { getPasteExpiry, isPasteExpired };

