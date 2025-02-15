import { Container } from '../domain/Container';

export interface ContainerRepository {
	create(container: Container): Promise<Container>;
	getById(id: string): Promise<Container | null>;
	getAll(): Promise<Container[]>;
	update(id: string, data: Partial<Container>): Promise<Container | null>;
	delete(id: string): Promise<boolean>;
}
