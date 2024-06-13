
import {Header} from './Header';
import { Footer } from './Footer';

export function MainLayout({ children }){
    return(
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );

}


