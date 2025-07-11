INSERT INTO movies (
    movie_name,
    movie_id,
    external_link,
    external_info,
    movie_is_active,
    movie_image,
    movie_duration
) VALUES
    ('The Shawshank Redemption', '278', 'https://www.themoviedb.org/movie/278', '{"overview": "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.", "release_date": "1994-09-23", "genres": ["Drama", "Crime"]}', true, 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 142),
    ('The Godfather', '238', 'https://www.themoviedb.org/movie/238', '{"overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.", "release_date": "1972-03-14", "genres": ["Drama", "Crime"]}', true, 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 175),
    ('Pulp Fiction', '680', 'https://www.themoviedb.org/movie/680', '{"overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster''s moll and a washed-up boxer converge in this sprawling, comedic crime caper.", "release_date": "1994-10-14", "genres": ["Thriller", "Crime"]}', false, 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 154),
    ('Inception', '27205', 'https://www.themoviedb.org/movie/27205', '{"overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance at redemption.", "release_date": "2010-07-16", "genres": ["Action", "Science Fiction"]}', true, 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 148),
    ('The Dark Knight', '155', 'https://www.themoviedb.org/movie/155', '{"overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.", "release_date": "2008-07-18", "genres": ["Action", "Crime", "Drama"]}', true, 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 152),
    ('Fight Club', '550', 'https://www.themoviedb.org/movie/550', '{"overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.", "release_date": "1999-10-15", "genres": ["Drama"]}', false, 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 139),
    ('Forrest Gump', '13', 'https://www.themoviedb.org/movie/13', '{"overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.", "release_date": "1994-07-06", "genres": ["Comedy", "Drama", "Romance"]}', true, 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg', 142),
    ('The Matrix', '603', 'https://www.themoviedb.org/movie/603', '{"overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.", "release_date": "1999-03-31", "genres": ["Action", "Science Fiction"]}', true, 'https://image.tmdb.org/t/p/w500/f89U3ADr1Wk1vfxGvBeb4OuJe.jpg', 136),
    ('Goodfellas', '769', 'https://www.themoviedb.org/movie/769', '{"overview": "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age.", "release_date": "1990-09-12", "genres": ["Drama", "Crime"]}', false, 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg', 145),
    ('Seven', '807', 'https://www.themoviedb.org/movie/807', '{"overview": "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the seven deadly sins in this dark and haunting film.", "release_date": "1995-09-22", "genres": ["Crime", "Mystery", "Thriller"]}', true, 'https://image.tmdb.org/t/p/w500/6yoghtyTpznpBAs6jgc18ZvvzRR.jpg', 127),
    ('Interstellar', '157336', 'https://www.themoviedb.org/movie/157336', '{"overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.", "release_date": "2014-11-07", "genres": ["Adventure", "Drama", "Science Fiction"]}', true, 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 169),
    ('Gladiator', '98', 'https://www.themoviedb.org/movie/98', '{"overview": "In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into chaos.", "release_date": "2000-05-05", "genres": ["Action", "Drama", "Adventure"]}', false, 'https://image.tmdb.org/t/p/w500/ty8TGR7vrsI1H9IG0nQiZBO8YKS.jpg', 155),
    ('The Silence of the Lambs', '274', 'https://www.themoviedb.org/movie/274', '{"overview": "Clarice Starling is a top student at the FBI''s training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter.", "release_date": "1991-02-14", "genres": ["Crime", "Drama", "Thriller"]}', true, 'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUce0MoIdwI.jpg', 118),
    ('Saving Private Ryan', '857', 'https://www.themoviedb.org/movie/857', '{"overview": "As U.S. troops storm the beaches of Normandy, three brothers lie dead on the battlefield, with a fourth trapped behind enemy lines.", "release_date": "1998-07-24", "genres": ["Drama", "History", "War"]}', true, 'https://image.tmdb.org/t/p/w500/1wY4psJ5NVEhDDKXcz6fILl1FGU.jpg', 169),
    ('The Green Mile', '497', 'https://www.themoviedb.org/movie/497', '{"overview": "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people''s ailments.", "release_date": "1999-12-10", "genres": ["Fantasy", "Drama", "Crime"]}', false, 'https://image.tmdb.org/t/p/w500/velWPhVMQeQIEVz2HXY6Y9j5j.jpg', 189),
    ('Parasite', '496243', 'https://www.themoviedb.org/movie/496243', '{"overview": "All unemployed, Ki-taek''s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.", "release_date": "2019-05-30", "genres": ["Comedy", "Thriller", "Drama"]}', true, 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 132),
    ('Whiplash', '244786', 'https://www.themoviedb.org/movie/244786', '{"overview": "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.", "release_date": "2014-10-10", "genres": ["Drama", "Music"]}', true, 'https://image.tmdb.org/t/p/w500/6uSPcdGNAHYTKm5I4gHk2zSPna.jpg', 107),
    ('Mad Max: Fury Road', '76341', 'https://www.themoviedb.org/movie/76341', '{"overview": "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken.", "release_date": "2015-05-15", "genres": ["Action", "Adventure", "Science Fiction"]}', false, 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O4XoU.jpg', 120),
    ('The Wolf of Wall Street', '106646', 'https://www.themoviedb.org/movie/106646', '{"overview": "A New York stockbroker refuses to cooperate in a large securities fraud case involving corruption on Wall Street.", "release_date": "2013-12-25", "genres": ["Crime", "Drama", "Comedy"]}', true, 'https://image.tmdb.org/t/p/w500/pWHf4C7ZCSrG2Wy4Q3ob1TJ2sI.jpg', 180),
    ('Joker', '475557', 'https://www.themoviedb.org/movie/475557', '{"overview": "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City.", "release_date": "2019-10-04", "genres": ["Crime", "Thriller", "Drama"]}', true, 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', 122);


    INSERT INTO theatres (theatre_id, theatre_name, theatre_location) VALUES
('THTR002', 'Grand XXI', 'Pacific Mall, Jl. Sudirman, Jakarta'),
('THTR003', 'Cineplex Central', 'Central Park, Jl. Letjen S. Parman, Surabaya'),
('THTR004', 'CGV Starlight', 'Pantai Indah Kapuk, North Jakarta'),
('THTR005', 'Platinum XXI', 'Gandaria City, Jl. Sultan Iskandar Muda, Bandung'),
('THTR006', 'Metro Cineplex', 'Mall of Indonesia, Jl. Raya Boulevard, Medan'),
('THTR007', 'XXI Premier', 'Tunjungan Plaza, Jl. Basuki Rahmat, Surabaya'),
('THTR008', 'Galaxy CGV', 'Summarecon Mall, Jl. Ahmad Yani, Bekasi'),
('THTR009', 'Cityplex XXI', 'Lippo Mall, Jl. Pahlawan, Makassar');

update movie_cinemas set seating_schema = 
'[
        {"row" : "A",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "A1"},
            {"seat" : "02", "status" : "available","seat_id" : "A2"},
            {"seat" : "03", "status" : "available","seat_id" : "A3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "04", "status" : "available","seat_id" : "A4"},
            {"seat" : "05", "status" : "available","seat_id" : "A5"},
            {"seat" : "06", "status" : "available","seat_id" : "A6"},
            {"seat" : "07", "status" : "available","seat_id" : "A7"},
            {"seat" : "08", "status" : "available","seat_id" : "A8"},
            {"seat" : "09", "status" : "available","seat_id" : "A9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "10", "status" : "available","seat_id" : "A10"},
            {"seat" : "11", "status" : "available","seat_id" : "A11"},
            {"seat" : "12", "status" : "available","seat_id" : "A12"}
        ]},
        {"row" : "B",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "B1"},
            {"seat" : "02", "status" : "available","seat_id" : "B2"},
            {"seat" : "03", "status" : "available","seat_id" : "B3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "BX"},
            {"seat" : "04", "status" : "available","seat_id" : "B4"},
            {"seat" : "05", "status" : "available","seat_id" : "B5"},
            {"seat" : "06", "status" : "available","seat_id" : "B6"},
            {"seat" : "07", "status" : "available","seat_id" : "B7"},
            {"seat" : "08", "status" : "available","seat_id" : "B8"},
            {"seat" : "09", "status" : "available","seat_id" : "B9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "BXX"},
            {"seat" : "10", "status" : "available","seat_id" : "B10"},
            {"seat" : "11", "status" : "available","seat_id" : "B11"},
            {"seat" : "12", "status" : "available","seat_id" : "B12"}
        ]},{"row" : "C",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "C1"},
            {"seat" : "02", "status" : "available","seat_id" : "C2"},
            {"seat" : "03", "status" : "available","seat_id" : "C3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "CX"},
            {"seat" : "04", "status" : "available","seat_id" : "C4"},
            {"seat" : "05", "status" : "available","seat_id" : "C5"},
            {"seat" : "06", "status" : "available","seat_id" : "C6"},
            {"seat" : "07", "status" : "available","seat_id" : "C7"},
            {"seat" : "08", "status" : "available","seat_id" : "C8"},
            {"seat" : "09", "status" : "available","seat_id" : "C9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "CXX"},
            {"seat" : "10", "status" : "available","seat_id" : "C10"},
            {"seat" : "11", "status" : "available","seat_id" : "C11"},
            {"seat" : "12", "status" : "available","seat_id" : "C12"}
        ]},
        {"row" : "D",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "D1"},
            {"seat" : "02", "status" : "available","seat_id" : "D2"},
            {"seat" : "03", "status" : "available","seat_id" : "D3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "DX"},
            {"seat" : "04", "status" : "available","seat_id" : "D4"},
            {"seat" : "05", "status" : "available","seat_id" : "D5"},
            {"seat" : "06", "status" : "available","seat_id" : "D6"},
            {"seat" : "07", "status" : "available","seat_id" : "D7"},
            {"seat" : "08", "status" : "available","seat_id" : "D8"},
            {"seat" : "09", "status" : "available","seat_id" : "D9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "DXX"}
        ]},
                {"row" : "E",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "E1"},
            {"seat" : "02", "status" : "available","seat_id" : "E2"},
            {"seat" : "03", "status" : "available","seat_id" : "E3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "EX"},
            {"seat" : "04", "status" : "available","seat_id" : "E4"},
            {"seat" : "05", "status" : "available","seat_id" : "E5"},
            {"seat" : "06", "status" : "available","seat_id" : "E6"},
            {"seat" : "07", "status" : "available","seat_id" : "E7"},
            {"seat" : "08", "status" : "available","seat_id" : "E8"},
            {"seat" : "09", "status" : "available","seat_id" : "E9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "EXX"}
        ]},
                {"row" : "F",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "F1"},
            {"seat" : "02", "status" : "available","seat_id" : "F2"},
            {"seat" : "03", "status" : "available","seat_id" : "F3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "FX"},
            {"seat" : "04", "status" : "available","seat_id" : "F4"},
            {"seat" : "05", "status" : "available","seat_id" : "F5"},
            {"seat" : "06", "status" : "available","seat_id" : "F6"},
            {"seat" : "07", "status" : "available","seat_id" : "F7"},
            {"seat" : "08", "status" : "available","seat_id" : "F8"},
            {"seat" : "09", "status" : "available","seat_id" : "F9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "FXX"}
        ]}
    ]';

INSERT INTO cinema_layout (layout_name,capacity,layout_description, seating_schema) VALUES('Basic Small Cinema layout', 62, 'A - C 12 || D - F 9','[
        {"row" : "A",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "A1"},
            {"seat" : "02", "status" : "available","seat_id" : "A2"},
            {"seat" : "03", "status" : "available","seat_id" : "A3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "04", "status" : "available","seat_id" : "A4"},
            {"seat" : "05", "status" : "available","seat_id" : "A5"},
            {"seat" : "06", "status" : "available","seat_id" : "A6"},
            {"seat" : "07", "status" : "available","seat_id" : "A7"},
            {"seat" : "08", "status" : "available","seat_id" : "A8"},
            {"seat" : "09", "status" : "available","seat_id" : "A9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "10", "status" : "available","seat_id" : "A10"},
            {"seat" : "11", "status" : "available","seat_id" : "A11"},
            {"seat" : "12", "status" : "available","seat_id" : "A12"}
        ]},
        {"row" : "B",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "B1"},
            {"seat" : "02", "status" : "available","seat_id" : "B2"},
            {"seat" : "03", "status" : "available","seat_id" : "B3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "BX"},
            {"seat" : "04", "status" : "available","seat_id" : "B4"},
            {"seat" : "05", "status" : "available","seat_id" : "B5"},
            {"seat" : "06", "status" : "available","seat_id" : "B6"},
            {"seat" : "07", "status" : "available","seat_id" : "B7"},
            {"seat" : "08", "status" : "available","seat_id" : "B8"},
            {"seat" : "09", "status" : "available","seat_id" : "B9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "BXX"},
            {"seat" : "10", "status" : "available","seat_id" : "B10"},
            {"seat" : "11", "status" : "available","seat_id" : "B11"},
            {"seat" : "12", "status" : "available","seat_id" : "B12"}
        ]},{"row" : "C",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "C1"},
            {"seat" : "02", "status" : "available","seat_id" : "C2"},
            {"seat" : "03", "status" : "available","seat_id" : "C3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "CX"},
            {"seat" : "04", "status" : "available","seat_id" : "C4"},
            {"seat" : "05", "status" : "available","seat_id" : "C5"},
            {"seat" : "06", "status" : "available","seat_id" : "C6"},
            {"seat" : "07", "status" : "available","seat_id" : "C7"},
            {"seat" : "08", "status" : "available","seat_id" : "C8"},
            {"seat" : "09", "status" : "available","seat_id" : "C9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "CXX"},
            {"seat" : "10", "status" : "available","seat_id" : "C10"},
            {"seat" : "11", "status" : "available","seat_id" : "C11"},
            {"seat" : "12", "status" : "available","seat_id" : "C12"}
        ]},
        {"row" : "D",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "D1"},
            {"seat" : "02", "status" : "available","seat_id" : "D2"},
            {"seat" : "03", "status" : "available","seat_id" : "D3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "DX"},
            {"seat" : "04", "status" : "available","seat_id" : "D4"},
            {"seat" : "05", "status" : "available","seat_id" : "D5"},
            {"seat" : "06", "status" : "available","seat_id" : "D6"},
            {"seat" : "07", "status" : "available","seat_id" : "D7"},
            {"seat" : "08", "status" : "available","seat_id" : "D8"},
            {"seat" : "09", "status" : "available","seat_id" : "D9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "DXX"}
        ]},
                {"row" : "E",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "E1"},
            {"seat" : "02", "status" : "available","seat_id" : "E2"},
            {"seat" : "03", "status" : "available","seat_id" : "E3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "EX"},
            {"seat" : "04", "status" : "available","seat_id" : "E4"},
            {"seat" : "05", "status" : "available","seat_id" : "E5"},
            {"seat" : "06", "status" : "available","seat_id" : "E6"},
            {"seat" : "07", "status" : "available","seat_id" : "E7"},
            {"seat" : "08", "status" : "available","seat_id" : "E8"},
            {"seat" : "09", "status" : "available","seat_id" : "E9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "EXX"}
        ]},
                {"row" : "F",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "F1"},
            {"seat" : "02", "status" : "available","seat_id" : "F2"},
            {"seat" : "03", "status" : "available","seat_id" : "F3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "FX"},
            {"seat" : "04", "status" : "available","seat_id" : "F4"},
            {"seat" : "05", "status" : "available","seat_id" : "F5"},
            {"seat" : "06", "status" : "available","seat_id" : "F6"},
            {"seat" : "07", "status" : "available","seat_id" : "F7"},
            {"seat" : "08", "status" : "available","seat_id" : "F8"},
            {"seat" : "09", "status" : "available","seat_id" : "F9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "FXX"}
        ]}
    ]');

INSERT INTO cinema_layout (layout_name,capacity,layout_description, seating_schema) VALUES('Medium Small Cinema layout', 62, 'A - C 12 || D - F 9','[
        {
        "row" : "A",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "A1"},
            {"seat" : "02", "status" : "available","seat_id" : "A2"},
            {"seat" : "03", "status" : "available","seat_id" : "A3"},
            {"seat" : "04", "status" : "available","seat_id" : "A4"},
            {"seat" : "05", "status" : "available","seat_id" : "A5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "A6"},
            {"seat" : "07", "status" : "available","seat_id" : "A7"},
            {"seat" : "08", "status" : "available","seat_id" : "A8"},
            {"seat" : "09", "status" : "available","seat_id" : "A9"},
            {"seat" : "10", "status" : "available","seat_id" : "A10"},
            {"seat" : "11", "status" : "available","seat_id" : "A11"},
            {"seat" : "12", "status" : "available","seat_id" : "A12"},
            {"seat" : "13", "status" : "available","seat_id" : "A13"},
            {"seat" : "14", "status" : "available","seat_id" : "A14"},
            {"seat" : "15", "status" : "available","seat_id" : "A15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "A16"},
            {"seat" : "17", "status" : "available","seat_id" : "A17"},
            {"seat" : "18", "status" : "available","seat_id" : "A18"},
            {"seat" : "19", "status" : "available","seat_id" : "A19"},
            {"seat" : "20", "status" : "available","seat_id" : "A20"}
        ]},
        {
        "row" : "B",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "B1"},
            {"seat" : "02", "status" : "available","seat_id" : "B2"},
            {"seat" : "03", "status" : "available","seat_id" : "B3"},
            {"seat" : "04", "status" : "available","seat_id" : "B4"},
            {"seat" : "05", "status" : "available","seat_id" : "B5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "B6"},
            {"seat" : "07", "status" : "available","seat_id" : "B7"},
            {"seat" : "08", "status" : "available","seat_id" : "B8"},
            {"seat" : "09", "status" : "available","seat_id" : "B9"},
            {"seat" : "10", "status" : "available","seat_id" : "B10"},
            {"seat" : "11", "status" : "available","seat_id" : "B11"},
            {"seat" : "12", "status" : "available","seat_id" : "B12"},
            {"seat" : "13", "status" : "available","seat_id" : "B13"},
            {"seat" : "14", "status" : "available","seat_id" : "B14"},
            {"seat" : "15", "status" : "available","seat_id" : "B15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "B16"},
            {"seat" : "17", "status" : "available","seat_id" : "B17"},
            {"seat" : "18", "status" : "available","seat_id" : "B18"},
            {"seat" : "19", "status" : "available","seat_id" : "B19"},
            {"seat" : "20", "status" : "available","seat_id" : "B20"}
        ]},
        {
        "row" : "C",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "C1"},
            {"seat" : "02", "status" : "available","seat_id" : "C2"},
            {"seat" : "03", "status" : "available","seat_id" : "C3"},
            {"seat" : "04", "status" : "available","seat_id" : "C4"},
            {"seat" : "05", "status" : "available","seat_id" : "C5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "C6"},
            {"seat" : "07", "status" : "available","seat_id" : "C7"},
            {"seat" : "08", "status" : "available","seat_id" : "C8"},
            {"seat" : "09", "status" : "available","seat_id" : "C9"},
            {"seat" : "10", "status" : "available","seat_id" : "C10"},
            {"seat" : "11", "status" : "available","seat_id" : "C11"},
            {"seat" : "12", "status" : "available","seat_id" : "C12"},
            {"seat" : "13", "status" : "available","seat_id" : "C13"},
            {"seat" : "14", "status" : "available","seat_id" : "C14"},
            {"seat" : "15", "status" : "available","seat_id" : "C15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "C16"},
            {"seat" : "17", "status" : "available","seat_id" : "C17"},
            {"seat" : "18", "status" : "available","seat_id" : "C18"},
            {"seat" : "19", "status" : "available","seat_id" : "C19"},
            {"seat" : "20", "status" : "available","seat_id" : "C20"}
        ]},
        {
        "row" : "D",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "D1"},
            {"seat" : "02", "status" : "available","seat_id" : "D2"},
            {"seat" : "03", "status" : "available","seat_id" : "D3"},
            {"seat" : "04", "status" : "available","seat_id" : "D4"},
            {"seat" : "05", "status" : "available","seat_id" : "D5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "D6"},
            {"seat" : "07", "status" : "available","seat_id" : "D7"},
            {"seat" : "08", "status" : "available","seat_id" : "D8"},
            {"seat" : "09", "status" : "available","seat_id" : "D9"},
            {"seat" : "10", "status" : "available","seat_id" : "D10"},
            {"seat" : "11", "status" : "available","seat_id" : "D11"},
            {"seat" : "12", "status" : "available","seat_id" : "D12"},
            {"seat" : "13", "status" : "available","seat_id" : "D13"},
            {"seat" : "14", "status" : "available","seat_id" : "D14"},
            {"seat" : "15", "status" : "available","seat_id" : "D15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "D16"},
            {"seat" : "17", "status" : "available","seat_id" : "D17"},
            {"seat" : "18", "status" : "available","seat_id" : "D18"},
            {"seat" : "19", "status" : "available","seat_id" : "D19"},
            {"seat" : "20", "status" : "available","seat_id" : "D20"}
        ]},
        {
        "row" : "E",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "E1"},
            {"seat" : "02", "status" : "available","seat_id" : "E2"},
            {"seat" : "03", "status" : "available","seat_id" : "E3"},
            {"seat" : "04", "status" : "available","seat_id" : "E4"},
            {"seat" : "05", "status" : "available","seat_id" : "E5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "E6"},
            {"seat" : "07", "status" : "available","seat_id" : "E7"},
            {"seat" : "08", "status" : "available","seat_id" : "E8"},
            {"seat" : "09", "status" : "available","seat_id" : "E9"},
            {"seat" : "10", "status" : "available","seat_id" : "E10"},
            {"seat" : "11", "status" : "available","seat_id" : "E11"},
            {"seat" : "12", "status" : "available","seat_id" : "E12"},
            {"seat" : "13", "status" : "available","seat_id" : "E13"},
            {"seat" : "14", "status" : "available","seat_id" : "E14"},
            {"seat" : "15", "status" : "available","seat_id" : "E15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "E16"},
            {"seat" : "17", "status" : "available","seat_id" : "E17"},
            {"seat" : "18", "status" : "available","seat_id" : "E18"},
            {"seat" : "19", "status" : "available","seat_id" : "E19"},
            {"seat" : "20", "status" : "available","seat_id" : "E20"}
        ]},
                {
        "row" : "F",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "F1"},
            {"seat" : "02", "status" : "available","seat_id" : "F2"},
            {"seat" : "03", "status" : "available","seat_id" : "F3"},
            {"seat" : "04", "status" : "available","seat_id" : "F4"},
            {"seat" : "05", "status" : "available","seat_id" : "F5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "F6"},
            {"seat" : "07", "status" : "available","seat_id" : "F7"},
            {"seat" : "08", "status" : "available","seat_id" : "F8"},
            {"seat" : "09", "status" : "available","seat_id" : "F9"},
            {"seat" : "10", "status" : "available","seat_id" : "F10"},
            {"seat" : "11", "status" : "available","seat_id" : "F11"},
            {"seat" : "12", "status" : "available","seat_id" : "F12"},
            {"seat" : "13", "status" : "available","seat_id" : "F13"},
            {"seat" : "14", "status" : "available","seat_id" : "F14"},
            {"seat" : "15", "status" : "available","seat_id" : "F15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "F16"},
            {"seat" : "17", "status" : "available","seat_id" : "F17"},
            {"seat" : "18", "status" : "available","seat_id" : "F18"},
            {"seat" : "19", "status" : "available","seat_id" : "F19"},
            {"seat" : "20", "status" : "available","seat_id" : "F20"}
        ]},
        {
        "row" : "G",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "G1"},
            {"seat" : "02", "status" : "available","seat_id" : "G2"},
            {"seat" : "03", "status" : "available","seat_id" : "G3"},
            {"seat" : "04", "status" : "available","seat_id" : "G4"},
            {"seat" : "05", "status" : "available","seat_id" : "G5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "G6"},
            {"seat" : "07", "status" : "available","seat_id" : "G7"},
            {"seat" : "08", "status" : "available","seat_id" : "G8"},
            {"seat" : "09", "status" : "available","seat_id" : "G9"},
            {"seat" : "10", "status" : "available","seat_id" : "G10"},
            {"seat" : "11", "status" : "available","seat_id" : "G11"},
            {"seat" : "12", "status" : "available","seat_id" : "G12"},
            {"seat" : "13", "status" : "available","seat_id" : "G13"},
            {"seat" : "14", "status" : "available","seat_id" : "G14"},
            {"seat" : "15", "status" : "available","seat_id" : "G15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "G16"},
            {"seat" : "17", "status" : "available","seat_id" : "G17"}

        ]},
        {
        "row" : "H",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "H1"},
            {"seat" : "02", "status" : "available","seat_id" : "H2"},
            {"seat" : "03", "status" : "available","seat_id" : "H3"},
            {"seat" : "04", "status" : "available","seat_id" : "H4"},
            {"seat" : "05", "status" : "available","seat_id" : "H5"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "06", "status" : "available","seat_id" : "H6"},
            {"seat" : "07", "status" : "available","seat_id" : "H7"},
            {"seat" : "08", "status" : "available","seat_id" : "H8"},
            {"seat" : "09", "status" : "available","seat_id" : "H9"},
            {"seat" : "10", "status" : "available","seat_id" : "H10"},
            {"seat" : "11", "status" : "available","seat_id" : "H11"},
            {"seat" : "12", "status" : "available","seat_id" : "H12"},
            {"seat" : "13", "status" : "available","seat_id" : "H13"},
            {"seat" : "14", "status" : "available","seat_id" : "H14"},
            {"seat" : "15", "status" : "available","seat_id" : "H15"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "16", "status" : "available","seat_id" : "H16"},
            {"seat" : "17", "status" : "available","seat_id" : "H17"}

        ]},
    ]');

INSERT INTO movie_cinemas(cinema_id, cinema_name, theatre_location, seating_schema, cinema_is_active,capacity) 
VALUES('CNM-TSM-004', 'Cinema 4', 'xxaxx',
    '[
        {"row" : "A",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "A1"},
            {"seat" : "02", "status" : "available","seat_id" : "A2"},
            {"seat" : "03", "status" : "available","seat_id" : "A3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AX"},
            {"seat" : "04", "status" : "available","seat_id" : "A4"},
            {"seat" : "05", "status" : "available","seat_id" : "A5"},
            {"seat" : "06", "status" : "available","seat_id" : "A6"},
            {"seat" : "07", "status" : "available","seat_id" : "A7"},
            {"seat" : "08", "status" : "available","seat_id" : "A8"},
            {"seat" : "09", "status" : "available","seat_id" : "A9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "AXX"},
            {"seat" : "10", "status" : "available","seat_id" : "A10"},
            {"seat" : "11", "status" : "available","seat_id" : "A11"},
            {"seat" : "12", "status" : "available","seat_id" : "A12"}
        ]},
        {"row" : "B",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "B1"},
            {"seat" : "02", "status" : "available","seat_id" : "B2"},
            {"seat" : "03", "status" : "available","seat_id" : "B3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "BX"},
            {"seat" : "04", "status" : "available","seat_id" : "B4"},
            {"seat" : "05", "status" : "available","seat_id" : "B5"},
            {"seat" : "06", "status" : "available","seat_id" : "B6"},
            {"seat" : "07", "status" : "available","seat_id" : "B7"},
            {"seat" : "08", "status" : "available","seat_id" : "B8"},
            {"seat" : "09", "status" : "available","seat_id" : "B9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "BXX"},
            {"seat" : "10", "status" : "available","seat_id" : "B10"},
            {"seat" : "11", "status" : "available","seat_id" : "B11"},
            {"seat" : "12", "status" : "available","seat_id" : "B12"}
        ]},{"row" : "C",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "C1"},
            {"seat" : "02", "status" : "available","seat_id" : "C2"},
            {"seat" : "03", "status" : "available","seat_id" : "C3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "CX"},
            {"seat" : "04", "status" : "available","seat_id" : "C4"},
            {"seat" : "05", "status" : "available","seat_id" : "C5"},
            {"seat" : "06", "status" : "available","seat_id" : "C6"},
            {"seat" : "07", "status" : "available","seat_id" : "C7"},
            {"seat" : "08", "status" : "available","seat_id" : "C8"},
            {"seat" : "09", "status" : "available","seat_id" : "C9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "CXX"},
            {"seat" : "10", "status" : "available","seat_id" : "C10"},
            {"seat" : "11", "status" : "available","seat_id" : "C11"},
            {"seat" : "12", "status" : "available","seat_id" : "C12"}
        ]},
        {"row" : "D",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "D1"},
            {"seat" : "02", "status" : "available","seat_id" : "D2"},
            {"seat" : "03", "status" : "available","seat_id" : "D3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "DX"},
            {"seat" : "04", "status" : "available","seat_id" : "D4"},
            {"seat" : "05", "status" : "available","seat_id" : "D5"},
            {"seat" : "06", "status" : "available","seat_id" : "D6"},
            {"seat" : "07", "status" : "available","seat_id" : "D7"},
            {"seat" : "08", "status" : "available","seat_id" : "D8"},
            {"seat" : "09", "status" : "available","seat_id" : "D9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "DXX"}
        ]},
                {"row" : "E",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "E1"},
            {"seat" : "02", "status" : "available","seat_id" : "E2"},
            {"seat" : "03", "status" : "available","seat_id" : "E3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "EX"},
            {"seat" : "04", "status" : "available","seat_id" : "E4"},
            {"seat" : "05", "status" : "available","seat_id" : "E5"},
            {"seat" : "06", "status" : "available","seat_id" : "E6"},
            {"seat" : "07", "status" : "available","seat_id" : "E7"},
            {"seat" : "08", "status" : "available","seat_id" : "E8"},
            {"seat" : "09", "status" : "available","seat_id" : "E9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "EXX"}
        ]},
                {"row" : "F",
        "column" : [
            {"seat" : "01", "status" : "available","seat_id" : "F1"},
            {"seat" : "02", "status" : "available","seat_id" : "F2"},
            {"seat" : "03", "status" : "available","seat_id" : "F3"},
            {"seat" : "XX", "status" : "lane","seat_id" : "FX"},
            {"seat" : "04", "status" : "available","seat_id" : "F4"},
            {"seat" : "05", "status" : "available","seat_id" : "F5"},
            {"seat" : "06", "status" : "available","seat_id" : "F6"},
            {"seat" : "07", "status" : "available","seat_id" : "F7"},
            {"seat" : "08", "status" : "available","seat_id" : "F8"},
            {"seat" : "09", "status" : "available","seat_id" : "F9"},
            {"seat" : "XX", "status" : "lane","seat_id" : "FXX"}
        ]}
    ]'
,true,63);

select (count(*)+1) from movie_schedules ms, movie_cinemas mc, theatres t where ms.cinema_location = mc.cinema_id and t.theatre_id = '';

select mc.cinema_id, ms.movie, ms.started_at, ms.end_at, ms.price, ms.movie_schedule_id
from movie_cinemas mc
left join theatres t on t.theatre_id = mc.theatre_location
left join movie_schedules ms on ms.cinema_location = mc.cinema_id
where mc.theatre_location = 'xxaxx';

select "mc"."cinema_id", "ms"."movie", "ms"."started_at", "ms"."end_at", "ms"."price", "ms"."movie_schedule_id" from "movie_cinemas" as "mc" left join "theatres" as "t" on "t"."theatre_id" = "mc"."theatre_location" left join "movie_schedules" as "ms" on "ms"."cinema_location" = "mc"."cinema_id" where "mc"."theatre_location" = 'xxaxx' and "ms"."started_at" between '2025-05-16T00:00:00' and '2025-05-16T23:59:59'

select mc.cinema_id, mc.cinema_name, ms.movie, m.movie_name, m.movie_image, ms.started_at, ms.end_at,ms.price,ms.movie_schedule_id
from movie_cinemas mc
left join movie_schedules ms on ms.cinema_location = mc.cinema_id
left join movies m on ms.movie = m.movie_id
left join movie_schedules msx on msx.started_at between '2025-05-19T00:00:00' and '2025-05-19T23:59:59'
where mc.theatre_location = 'xxaxx'
-- inner join theatres t on t.theatre_id = mc.theatre_location

'LSD/xxaxx/' || LPAD((select (count(*) + 1)::TEXT from locket_schedule where theatre_location = 'xxaxx'),3,'0')

select "e"."employee_name", "ls"."locket_name", "ls"."started_at", "ls"."end_at", "ls"."schedule_id" from "locket_schedule" as "ls" inner join "employees" as "e" on "e"."employee_id" = "ls"."employee" where "ls"."theatre_location" = 'xxaxx' and "ls"."started_at" between '2025-06-07T00:00' and '2025-06-14T00:00'

INSERT INTO movie_schedules VALUES('238','2025-05-16 06:00:00', '2025-05-16 09:00:00', 35000, 'xx00010', 'CNM-TSM-004');