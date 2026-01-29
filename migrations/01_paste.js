const paste = async (client) => {
    const table = `
        CREATE TABLE IF NOT EXISTS pastes (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            content TEXT NOT NULL,
            views INT DEFAULT 0,
            max_views INT,
            ttl_seconds INT,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
    `;
    await client.query(table);
}

export default paste;
