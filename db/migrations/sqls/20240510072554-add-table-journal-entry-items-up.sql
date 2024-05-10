CREATE TABLE IF NOT EXISTS journal_entry_items (
    id BIGSERIAL NOT NULL,
    journal_entry_id BIGINT NOT NULL,
    account_type_id BIGINT NOT NULL,
    notes VARCHAR(255) NULL,
    debit NUMERIC(20, 5) NOT NULL DEFAULT 0,
    credit NUMERIC(20, 5) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id),
    FOREIGN KEY (account_type_id) REFERENCES account_types(id)
);