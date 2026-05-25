import { Cliente } from "./cliente";
import { Caso } from "./caso";
import { Prova } from "./prova";
import { Audiencia, Pericia, Reuniao } from "./agenda";
import { Financeiro } from "./financeiro";
import { Usuario } from "./usuario";
import { PortalConfig } from "./portal";

export * from "./cliente";
export * from "./caso";
export * from "./prova";
export * from "./agenda";
export * from "./financeiro";
export * from "./usuario";
export * from "./portal";
export * from "./informacao";
export * from "./credencial";

// Legacy type aliases for full backward compatibility with original screens
export type Client = Cliente;
export type LegalCase = Caso;
export type Evidence = Prova;
export type Audience = Audiencia;
export type ExpertOpinion = Pericia;
export type Meeting = Reuniao;
export type FinanceItem = Financeiro;
export type User = Usuario;
