CREATE TABLE IF NOT EXISTS journal_entries (
    id BIGSERIAL NOT NULL,
    account_book_id BIGINT NOT NULL,
    code VARCHAR(50) NOT NULL,
    datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    CONSTRAINT uq_journal_entry_code UNIQUE(code),
    FOREIGN KEY (account_book_id) REFERENCES account_books(id)
);