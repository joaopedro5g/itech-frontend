/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { motion, useAnimation } from 'framer-motion';

import { AiOutlineUser } from 'react-icons/ai';
import { IoMdApps } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { BiHealth } from 'react-icons/bi';
import { BsBag } from 'react-icons/bs';
import { GrHostMaintenance } from 'react-icons/gr';

import styles from './styles.module.scss';

const Modal = ({ isOpen, newState, animation }) => {
  const scrolledRef = useRef<HTMLDivElement>(null);
  const variants = {
    open1: {
      y: '30vh',
      transition: {
        duration: .3
      },
      width: '57vh',
      left: '32.5%',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    },
    open2: {
      y: 0,
      left: '30%',
      width: '65vh',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      transition: {
        duration: .3
      },
    },
    close: {
      y: '105vh',
      transition: {
        duration: .3
      }
    },
  }
  const handleToggleModal = () =>
    newState(o => !o);
  useEffect(() => {
    if(isOpen) {
      animation.start('open1');
      document.body.style.overflow = 'hidden';
      scrolledRef.current.scrollTo(0,0);
    } else {
      animation.start('close');
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);
  const handleScroll = () => {
    if (scrolledRef.current?.scrollTop > 10) {
      animation.start('open2');
    } else {
      animation.start('open1');
    }
  }
  return (
    <>
      <motion.div
        ref={scrolledRef}
        onScroll={handleScroll}
        className={styles.modal}
        variants={variants}
        animate={animation}
        initial="close"
      >
        <div className={styles.header}>
          <img src="https://i.pinimg.com/736x/8c/5c/aa/8c5caa7bdd5af027cb43e23c8de43f70.jpg" alt="foto de isabela" />
          <h4>Olá Isabela!</h4>
          <span>isabela_silva@gmail.com</span>
        </div>
        <ul className={styles.options}>
          <li>
            <div><FiSettings /> Configuração</div>
          </li>
          <li>
            <div><BiHealth /> CheckSystem</div>
          </li>
          <li>
            <div><BsBag /> Lista de desejo</div>
          </li>
          <li>
            <div><GrHostMaintenance /> Manutenção</div>
          </li>
          <li>
            <div><FiSettings /> Configuração</div>
          </li>
          <li>
            <div><BiHealth /> CheckSystem</div>
          </li>
          <li>
            <div><BsBag /> Lista de desejo</div>
          </li>
          <li>
            <div><GrHostMaintenance /> Manutenção</div>
          </li>
        </ul>
        <div className={styles.pc}>eaeaeae</div>
      </motion.div>
      { isOpen && <div onClick={handleToggleModal} className={styles.opacity} /> }
    </>
  );
}

const Navbar = () => {
  const animation = useAnimation();
  const [isOpen,setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener('keydown', async e => {
      if (e.key === 'Escape' && isOpen) { 
        await animation.start('open1');
        setOpen(false);
      }
    })
  }, []);
  return (
    <>
      <Modal animation={animation} isOpen={isOpen} newState={setOpen} />
      <div className={styles.wrapper}>
        <h1 onClick={() => router.replace('/')}>Conta do iTech</h1>
        <div className={styles.divider} />
        <ul>
          <li><a href="#">Suas informações</a></li>
          <li><a href="#">Segurança</a></li>
          <li><a href="#">Assinatura</a></li>
          <li><a href="#">Dispositivos</a></li>
        </ul>
        <ul>
          <li><IoMdApps /></li>
          <li><AiOutlineUser onClick={() => setOpen(true)} /></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar;