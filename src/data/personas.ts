/** User personas del plan. Alimentan la sección "Para quién", mensajes de WhatsApp y páginas de solución. */
import type { PersonaKey } from './modelos';

export const PERSONAS: {
  key: PersonaKey;
  icon: 'hardhat' | 'clipboard' | 'store' | 'factory';
  titulo: string;
  necesidad: string;
  modelos: string[];
  href: string;
  cta: string;
}[] = [
  {
    key: 'residente',
    icon: 'hardhat',
    titulo: 'Residentes de obra',
    necesidad: 'Una oficina con clima junto a la obra para revisar planos, recibir subcontratistas y llevar la bitácora.',
    modelos: ['VX-6M', 'VX-8M'],
    href: '/soluciones/constructoras',
    cta: 'Soy residente de obra',
  },
  {
    key: 'compras',
    icon: 'clipboard',
    titulo: 'Compras de constructoras',
    necesidad: 'Comparar especificaciones completas y recibir una cotización formal para el expediente de la obra.',
    modelos: ['VX-4M', 'VX-6P', 'VX-10M'],
    href: '/soluciones/constructoras',
    cta: 'Necesito cotización formal',
  },
  {
    key: 'remodelacion',
    icon: 'store',
    titulo: 'Negocios en remodelación',
    necesidad: 'Seguir atendiendo mientras se remodela el local, la clínica o el despacho, sin rentar otra oficina.',
    modelos: ['VX-3M', 'VX-4M'],
    href: '/soluciones/remodelaciones',
    cta: 'Voy a remodelar',
  },
  {
    key: 'planta',
    icon: 'factory',
    titulo: 'Plantas y naves industriales',
    necesidad: 'Espacio para supervisar contratistas durante una ampliación, con privado para el responsable del proyecto.',
    modelos: ['VX-8P', 'VX-10P'],
    href: '/soluciones/naves-e-industria',
    cta: 'Tengo un proyecto en planta',
  },
];
