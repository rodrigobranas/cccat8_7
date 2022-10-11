create table ccca.item (
	id_item serial primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into ccca.item (description, price, width, height, length, weight) values ('Guitarra', 1000, 100, 30, 10, 3);
insert into ccca.item (description, price, width, height, length, weight) values ('Amplificador', 5000, 50, 50, 50, 20);
insert into ccca.item (description, price, width, height, length, weight) values ('Cabo', 30, 10, 10, 10, 1);

create table ccca.zipcode (
	code text primary key,
	street text,
	neighborhood text,
	lat numeric,
	long numeric
);

insert into ccca.zipcode (code, street, neighborhood, lat, long) values ('88015600', 'Rua Almirante Lamego', 'Centro', -27.5945, -48.5477);
insert into ccca.zipcode (code, street, neighborhood, lat, long) values ('22060030', 'Rua Aires Saldanha', 'Copacabana', -22.9129, -43.2003);
