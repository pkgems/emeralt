import test from 'ava';
import { jwtService } from '../jwt';
test('jwt', (t) => {
    const name = 'tester';
    // @ts-ignore
    const jwt = jwtService({
        config: {
            jwt: {
                secret: 'secret',
            },
        },
    });
    const token = jwt.sign({ name });
    t.deepEqual(jwt.verify(token).name, name);
});
