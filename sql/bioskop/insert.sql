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

INSERT INTO movie_cinemas(cinema_id, cinema_name, theatre_location, seating_schema, cinema_is_active,capacity) 
VALUES('CNM-TSM-004', 'Cinema 4', 'xxaxx',
    '[
        {"row" : "A",
        "column" : [
            {"seat" : "01", "status" : "available"},
            {"seat" : "02", "status" : "available"},
            {"seat" : "03", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "04", "status" : "available"},
            {"seat" : "05", "status" : "available"},
            {"seat" : "06", "status" : "available"},
            {"seat" : "07", "status" : "available"},
            {"seat" : "08", "status" : "available"},
            {"seat" : "09", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "10", "status" : "available"},
            {"seat" : "11", "status" : "available"},
            {"seat" : "12", "status" : "available"}
        ]},
        {"row" : "B",
        "column" : [
            {"seat" : "01", "status" : "available"},
            {"seat" : "02", "status" : "available"},
            {"seat" : "03", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "04", "status" : "available"},
            {"seat" : "05", "status" : "available"},
            {"seat" : "06", "status" : "available"},
            {"seat" : "07", "status" : "available"},
            {"seat" : "08", "status" : "available"},
            {"seat" : "09", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "10", "status" : "available"},
            {"seat" : "11", "status" : "available"},
            {"seat" : "12", "status" : "available"}
        ]},{"row" : "C",
        "column" : [
            {"seat" : "01", "status" : "available"},
            {"seat" : "02", "status" : "available"},
            {"seat" : "03", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "04", "status" : "available"},
            {"seat" : "05", "status" : "available"},
            {"seat" : "06", "status" : "available"},
            {"seat" : "07", "status" : "available"},
            {"seat" : "08", "status" : "available"},
            {"seat" : "09", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "10", "status" : "available"},
            {"seat" : "11", "status" : "available"},
            {"seat" : "12", "status" : "available"}
        ]},
        {"row" : "D",
        "column" : [
            {"seat" : "01", "status" : "available"},
            {"seat" : "02", "status" : "available"},
            {"seat" : "03", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "04", "status" : "available"},
            {"seat" : "05", "status" : "available"},
            {"seat" : "06", "status" : "available"},
            {"seat" : "07", "status" : "available"},
            {"seat" : "08", "status" : "available"},
            {"seat" : "09", "status" : "available"},
            {"seat" : "XX", "status" : "lane"}
        ]},
                {"row" : "E",
        "column" : [
            {"seat" : "01", "status" : "available"},
            {"seat" : "02", "status" : "available"},
            {"seat" : "03", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "04", "status" : "available"},
            {"seat" : "05", "status" : "available"},
            {"seat" : "06", "status" : "available"},
            {"seat" : "07", "status" : "available"},
            {"seat" : "08", "status" : "available"},
            {"seat" : "09", "status" : "available"},
            {"seat" : "XX", "status" : "lane"}
        ]},
                {"row" : "F",
        "column" : [
            {"seat" : "01", "status" : "available"},
            {"seat" : "02", "status" : "available"},
            {"seat" : "03", "status" : "available"},
            {"seat" : "XX", "status" : "lane"},
            {"seat" : "04", "status" : "available"},
            {"seat" : "05", "status" : "available"},
            {"seat" : "06", "status" : "available"},
            {"seat" : "07", "status" : "available"},
            {"seat" : "08", "status" : "available"},
            {"seat" : "09", "status" : "available"},
            {"seat" : "XX", "status" : "lane"}
        ]}
    ]'
,true,63);

