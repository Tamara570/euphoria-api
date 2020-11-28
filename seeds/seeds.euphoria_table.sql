TRUNCATE blog RESTART IDENTITY CASCADE;

BEGIN;

-- INSERT INTO euphoria_users (fullname, username, password)
-- VALUES
--     ('Bob Builder', 'BBuild1', 'Marysays29901'),
--     ('Joan Lynn', 'JJoles3', 'candylady2'),
--     ('Bill Wet', 'Twilight_1', 'Wolfpack112');

INSERT INTO blog (title, content, username)
VALUES
    ('My Thoughts', 'Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat eget, rhoncus sodales erat.', 'Marysays29901'),
    ('More Thoughts', 'Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat eget, rhoncus sodales erat.', 'candylady2'),
    ('Even More Thoughts', 'Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat eget, rhoncus sodales erat.', 'Wolfpack112');

COMMIT;