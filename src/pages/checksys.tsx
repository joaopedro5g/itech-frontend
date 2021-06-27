/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Head from 'next/head';

import service from '../service/computer';
import useRequest from '../hooks/useRequest';

import { motion, useAnimation } from 'framer-motion';

import styles from '../styles/CheckSys.module.scss';

const CheckSys = () => {
  const [computer,setComputer] = useState(null);
  const animate = useAnimation();
  const [data,error] = useRequest('/check');
  const variants = {
    finded: {
      left: 40,
      width: "16rem",
      height: "22rem",
      transition: {
        duration: .8,
      }
    },
    error: {
      left: 'initial',
      width: "22rem",
      height: "18rem",
      transition: {
        duration: .8,
      }
    }
  }
  useEffect(() => {
    if (data) {
      setComputer(data);
      animate.start('finded');
    }
    if (error) {
      setComputer(null);
      animate.start('error');
    }
  }, [data, error]);
  const handleShutdown = async () => {
    await service.get('/command/shutdown');
    return true;
  }
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Conta iTech | {computer?.os && !error ? `${computer.os.distro}(${computer.type})` : 'CheckSystem'}</title>
      </Head>
      <motion.div
        className={styles.basicInfo}
        variants={variants}
        animate={animate}
      >
        {
          !error ?
          !computer ? 
            <>
              <h2>Identificando o produto</h2>
              <div className={styles.loading} />
            </>
            :
            <>
              <img src={`https://logonoid.com/images/thumbs/${computer.os.logofile}-logo.png`} alt={`logo de ${computer.os.distro}`} />
              <span className={styles.username}>{computer.host}</span>
              <span className={styles.subtitle}>{computer.os.distro} - {computer.os.release}({computer.os.codename})</span>
              <ul>
                <li>
                  <span>
                    KERNEL: <span>{computer.os.kernel}</span>
                  </span>
                </li>
                <li>
                  <span>
                    NÚCLEOS: <span>{computer?.cpu.physicalCores}(x{computer.cpu.threads}) ({computer.arch})</span>
                  </span>
                </li>
                {
                  computer.wifi.length > 0 &&
                  <li>
                    <span>
                      WIFI: <span>{computer.wifi[0].ssid}</span>
                    </span>
                  </li>
                }
                <li>
                  <span>
                    PLACA MÃE: <span>{computer.board.model}({computer.board.manufacturer})</span>
                  </span>
                </li>
              </ul>
              <div className={styles.buttons}>
                <button onClick={handleShutdown}>Desligar</button>
                <button>Reiniciar</button>
              </div>
            </>
          :
            <>
              <h2>Não foi possivel encontrar o driver de acesso</h2>
            </>
        }
      </motion.div>
      <div className={`${styles.completeInfo} ${computer ? styles.active : ''}`}>
        { computer && !error &&
          <table>
            <tr>
              <td>Placa mãe</td>
              <td>{computer?.board.model}({computer?.board.manufacturer})</td>
            </tr>
            <tr>
              <td>Processador</td>
              <td>{computer?.cpu.manufacturer} - {computer?.cpu.brand} x{computer?.cpu.physicalCores} (x{computer?.cpu.threads})</td>
            </tr>
            <tr>
              <td>Memória RAM</td>
              <td>{computer?.memory} GiB</td>
            </tr>
            <tr>
              <td>Placa(s) de video(s)</td>
              <td>
                <ul>
                  {
                    computer?.gpus.map(d => (
                      <li key={d.busAddress}>{d.model}({d.vendor}) - {(d.vram / 1024).toFixed(3)} vRAM GiB</li>
                    ))
                  }
                </ul>
              </td>
            </tr>
            <tr>
              <td>Disco(s)</td>
              <td>
                <ul>
                  {
                    computer?.disk.map(d => (
                      <li key={d.name}>{d.type} {`${String(d.size).split('')[0]}${String(d.size).split('')[1]}${String(d.size).split('')[2]}`} GiB ({d.vendor})</li>
                    ))
                  }
                </ul>
              </td>
            </tr>
            {
              computer.wifi && computer.wireless &&
              <>
                <tr>
                  <td>USB(s)</td>
                  <td>
                    <ul>
                      {
                        computer?.usbs.map((d, i) => (
                          <li key={i}>{d.name || 'Sem nome'} - {d.type} ({d.maxPower})</li>
                        ))
                      }
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Wifi</td>
                  <td>{computer?.wifiInfo[0].model}({computer?.wifiInfo[0].vendor})</td>
                </tr>
                <tr>
                  <td>Redes por perto</td>
                  <td>
                    <ul>
                      {
                        computer?.wireless.map(d => (
                          <li key={d.bssid}>{d.ssid} - ({d.security[0]})</li>
                        ))
                      }
                    </ul>
                  </td>
                </tr>
              </>
            }
            <tr>
              <td>Processos</td>
              <td>
                <ul>
                  {
                    computer?.process.map(d => (
                      <li key={d.pid}>{d.name || 'Sem nome'} - ({d.path})</li>
                    ))
                  }
                </ul>
              </td>
            </tr>
            <tr>
              <td>Monitores</td>
              <td>
                <ul>
                  {
                    computer?.displays.map(d => (
                      <li key={d.connection}>{d.deviceName || d.model || 'Monitor Desconhecido'} {d.resolutionX && d.resolutionY ? ` - (${d.resolutionX}x${d.resolutionY})` : null}</li>
                    ))
                  }
                </ul>
              </td>
            </tr>
          </table>
        }
      </div>
    </div>
  );
}

export default CheckSys;