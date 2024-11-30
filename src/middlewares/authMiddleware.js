// Guards
import store from '@/store'

export function AuthGuard(to, from, next) {

    if (store.getters.auth) {
        next();
    } else {
        next({
          name: 'Home'
        });
    }
}