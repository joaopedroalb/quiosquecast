import { GetStaticProps } from "next";
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import Image from 'next/image'
import Link from 'next/link'

import { api } from "../Services/api";

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { convertDurationToTimeString } from "../Utils/convertDurationToTimeString";

import styles from './home.module.scss'

type Episode = {
  id: string,
  title: string,
  members: string,
  published_at: string,
  thumbnail: string,
  publishedAt: string,
  duration: number,
  durationStr: string,
  url: string
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}


export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const {play} = useContext(PlayerContext)
  const episodeFormat = (ep:Episode) =>{
    return{
      title: ep.title,
      members: ep.members,
      thumbnail: ep.thumbnail,
      duration: ep.duration,
      url: ep.url,
    }
  }


  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(ep => {
            return (
              <li key={ep.id}>

                <Image
                  width={192}
                  height={192}
                  src={ep.thumbnail}
                  alt={ep.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episode/${ep.id}`}>
                    <a>{ep.title}</a>
                  </Link>
                  <p>{ep.members}</p>
                  <span>{ep.publishedAt}</span>
                  <span>{ep.durationStr}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Play Episode" onClick={()=>{play(episodeFormat(ep))}} />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>PodCast</th>
              <th>Participantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allEpisodes.map(ep => {
              return (
                <tr key={ep.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={ep.thumbnail}
                      alt={ep.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${ep.id}`}>
                      <a >{ep.title}</a>
                    </Link>

                  </td>

                  <td>{ep.members}</td>
                  <td style={{ width: 100 }}>{ep.publishedAt}</td>
                  <td>{ep.durationStr}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="play episode" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}


//Consumo da api
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationStr: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    };
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes: latestEpisodes,
      allEpisodes: allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
