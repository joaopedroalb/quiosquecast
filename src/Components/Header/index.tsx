import Link from 'next/link'

import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export function Header(){

    const currentDate = format(new Date(),'EEEEEE, d MMMM',{
        locale: ptBR,
    });

    return(
        <header className={styles.container}>
            <Link href="/">
                <img src="/logo-svg.png" alt="Podcastr"/>
            </Link> 

 
            <p>O pior podcast para você escutar</p>

            <span>{currentDate}</span>
        </header>
    );
}