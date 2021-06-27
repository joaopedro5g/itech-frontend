/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';

import useRequest from '../hooks/useRequest';

import { RiCoinsLine, RiComputerLine } from 'react-icons/ri';
import { MdDevicesOther, MdSecurity, MdEmail } from 'react-icons/md';
import { BiHealth } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';

import styles from '../styles/Home.module.scss';

const Home = () => {
  const [checkSys, errSys] = useRequest('/check');
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Conta iTech | Inicio</title>
      </Head>
      <header>
        <div className={styles.user}>
          <img src="https://i.pinimg.com/736x/8c/5c/aa/8c5caa7bdd5af027cb43e23c8de43f70.jpg" alt="Image de Isabela" />
          <div className={styles.text}>
            <span>Isabela</span>
            <span><AiOutlineMail /> isabela_silva@gmail.com</span>
          </div>
        </div>
      </header>
      <div className={styles.grid}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h4>Assinaturas</h4>
          </div>
          <div className={styles.body}>
            <RiCoinsLine />
            <h3>Experimente a assinatura iTech</h3>
            <span>Tenha mais produtividade com o pacote Office, McAfee, manutenções mensais e CheckSystem com um técnico.</span>
          </div>
          <div className={styles.footer}>
            <Link href="/plans">
              <a>Ver planos</a>
            </Link>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h4>Dispositivos</h4>
          </div>
          <div className={styles.body}>
            <RiComputerLine />
            <h3>Veja seus dispositivos conectado</h3>
            <span>Você pode ver seus dipositivos e bloquea-lo, atualizar drivers, agendar reparos, delisga-lo etc.</span>
          </div>
          <div className={styles.footer}>
            <Link href="/devices">
              <a>Mostrar todos</a>
            </Link>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h4>Segurança</h4>
          </div>
          <div className={styles.body}>
            <MdSecurity />
            <h3>Veja como anda sua segurança</h3>
            <span>Verifica se a atualizações de softwares, anti-virus e até mesmo entrar em modo de segurança com a chamada automaticamente de um técnico.</span>
          </div>
          <div className={styles.footer}>
            <Link href="/security">
              <a>Saiba mais</a>
            </Link>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h4>CheckSystem</h4>
          </div>
          {
            checkSys ?
            <div className={styles.checkSys}>
              <img src={`https://logonoid.com/images/thumbs/${checkSys.os.logofile}-logo.png`} alt={`logo de ${checkSys.os.distro}`} />
              <span className={styles.username}>{checkSys.host}</span>
              <span className={styles.subtitle}>{checkSys.os.distro} - {checkSys.os.release}({checkSys.os.codename})</span>
              <ul>
                <li>
                  <span>
                    KERNEL: <span>{checkSys.os.kernel}</span>
                  </span>
                </li>
                <li>
                  <span>
                    NÚCLEOS: <span>{checkSys?.cpu.physicalCores}(x{checkSys?.cpu.threads}) ({checkSys.arch})</span>
                  </span>
                </li>
                {
                  checkSys.wifi.length > 0 &&
                  <li>
                    <span>
                      WIFI: <span>{checkSys.wifi[0].ssid}</span>
                    </span>
                  </li>
                }
                <li>
                  <span>
                    PLACA MÃE: <span>{checkSys.board.model}({checkSys.board.manufacturer})</span>
                  </span>
                </li>
              </ul>
            </div>
            :
            <div className={styles.body}>
              <BiHealth />
              <h3>Saúde da sua máquina</h3>
              <span>Veja com está a vida útil do seu computador, configurações de hardware, nome do dispositivo versão do S.O, e driver iTech.</span>
            </div>
          }
          <div className={styles.footer}>
            <Link href="/checksys">
              <a>Checar agora</a>
            </Link>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h4>Remote Control</h4>
          </div>
          <div className={styles.body}>
            <MdDevicesOther />
            <h3>Sua máquina na palma da mão</h3>
            <span>Acessa seus arquivos da sua máquina, da play em músicas e videos, desliga e muito mais com o seu celular.</span>
          </div>
          <div className={styles.footer}>
            <span>Conectar agora</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;