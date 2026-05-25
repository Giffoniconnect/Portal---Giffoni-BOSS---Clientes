import { Cliente, Caso, Prova, Audiencia, Pericia, Reuniao, Financeiro, Usuario, PortalConfig, CredencialCliente } from "../types";

// Base Mock Users mimicking Auth / Roles
export const MOCK_USERS: Usuario[] = [
  {
    id: "usr_boss",
    nome: "Dr. Roberto Giffoni",
    email: "direito.rgr@gmail.com",
    role: "BOSS",
    ativo: true
  },
  {
    id: "usr_adv1",
    nome: "Dra. Patrícia Lima",
    email: "patricia.lima@giffoni.adv.br",
    role: "ADVOGADO",
    ativo: true
  },
  {
    id: "usr_maria",
    nome: "Maria Regina",
    email: "maria.regina@gmail.com",
    role: "CLIENTE",
    clienteId: "cli_maria_regina",
    ativo: true
  },
  {
    id: "usr_empresa",
    nome: "Administrador Empresa Teste",
    email: "diretoria@empresateste.com.br",
    role: "CLIENTE",
    clienteId: "cli_empresa_teste_ltda",
    ativo: true
  },
  {
    id: "usr_bloqueado",
    nome: "Cliente Bloqueado",
    email: "bloqueado@email.com",
    role: "CLIENTE",
    clienteId: "cli_bloqueado",
    ativo: false
  }
];

export const MOCK_CREDENCIAL_CLIENTE: CredencialCliente[] = [
  {
    id: "cred_maria",
    clienteId: "cli_maria_regina",
    slug: "maria-regina",
    login: "maria.regina@email.com",
    senha: "123456",
    password: "123456",
    ativo: true,
    criadoEm: "2025-01-20T10:00:00Z",
    atualizadoEm: "2025-10-25T14:30:00Z"
  },
  {
    id: "cred_empresa",
    clienteId: "cli_empresa_teste_ltda",
    slug: "empresa-teste-ltda",
    login: "contato@empresateste.com.br",
    senha: "123456",
    password: "123456",
    ativo: true,
    criadoEm: "2025-02-15T14:00:00Z",
    atualizadoEm: "2025-10-25T14:30:00Z"
  },
  {
    id: "cred_bloqueado",
    clienteId: "cli_bloqueado",
    slug: "bloqueado-ltda",
    login: "bloqueado@email.com",
    senha: "123456",
    password: "123456",
    ativo: false,
    criadoEm: "2025-03-01T09:00:00Z",
    atualizadoEm: "2025-10-25T14:30:00Z"
  }
];

export const MOCK_CLIENTS: Cliente[] = [
  {
    id: "cli_maria_regina",
    slug: "maria-regina",
    nome: "Maria Regina",
    name: "Maria Regina",
    tipoPessoa: "PF",
    cpf: "111.222.333-55",
    cnpj: "",
    cpfCnpj: "111.222.333-55",
    email: "maria.regina@gmail.com",
    telefone: "(11) 98888-8888",
    phone: "(11) 98888-8888",
    endereco: "Rua das Flores, 123, Jardins, São Paulo - SP",
    address: "Rua das Flores, 123, Jardins, São Paulo - SP",
    status: "active",
    criadoEm: "2025-01-20T10:00:00Z",
    createdAt: "2025-01-20T10:00:00Z",
    atualizadoEm: "2025-10-25T14:30:00Z"
  },
  {
    id: "cli_empresa_teste_ltda",
    slug: "empresa-teste-ltda",
    nome: "Empresa Teste Ltda",
    name: "Empresa Teste Ltda",
    tipoPessoa: "PJ",
    cpf: "",
    cnpj: "12.345.678/0001-00",
    cpfCnpj: "12.345.678/0001-00",
    email: "diretoria@empresateste.com.br",
    telefone: "(11) 3333-4444",
    phone: "(11) 3333-4444",
    endereco: "Av. Paulista, 1000, Bela Vista, São Paulo - SP",
    address: "Av. Paulista, 1000, Bela Vista, São Paulo - SP",
    status: "active",
    criadoEm: "2025-02-15T14:00:00Z",
    createdAt: "2025-02-15T14:00:00Z",
    atualizadoEm: "2025-10-25T14:30:00Z"
  },
  {
    id: "cli_bloqueado",
    slug: "bloqueado-ltda",
    nome: "Empresa Bloqueada S/A",
    name: "Empresa Bloqueada S/A",
    tipoPessoa: "PJ",
    cpf: "",
    cnpj: "99.999.999/0001-99",
    cpfCnpj: "99.999.999/0001-99",
    email: "bloqueado@email.com",
    telefone: "(11) 1111-1111",
    phone: "(11) 1111-1111",
    endereco: "Rua das Laranjeiras, 999, Pinheiros, São Paulo - SP",
    address: "Rua das Laranjeiras, 999, Pinheiros, São Paulo - SP",
    status: "inactive",
    criadoEm: "2025-03-01T09:00:00Z",
    createdAt: "2025-03-01T09:00:00Z",
    atualizadoEm: "2025-10-25T14:30:00Z"
  },
  {
    id: "cli_1",
    slug: "giffoni-eng",
    nome: "Giffoni Empreendimentos e Engenharia Ltda",
    name: "Giffoni Empreendimentos e Engenharia Ltda",
    tipoPessoa: "PJ",
    cpf: "",
    cnpj: "12.345.678/0001-90",
    cpfCnpj: "12.345.678/0001-90",
    email: "contato@giffonieng.com.br",
    telefone: "(11) 98765-4321",
    phone: "(11) 98765-4321",
    endereco: "Av. Paulista, 1500, Bela Vista, São Paulo - SP",
    address: "Av. Paulista, 1500, Bela Vista, São Paulo - SP",
    status: "active",
    criadoEm: "2025-01-15T10:00:00Z",
    createdAt: "2025-01-15T10:00:00Z",
    atualizadoEm: "2025-10-25T14:30:00Z"
  }
];

export const MOCK_CASES: Caso[] = [
  {
    id: "case_maria_1",
    clienteId: "cli_maria_regina",
    clientName: "Maria Regina",
    numeroProcesso: "1004567-12.2025.8.26.0100",
    caseNumber: "1004567-12.2025.8.26.0100",
    titulo: "Ação de Cobrança de Aluguéis e Despejo",
    title: "Ação de Cobrança de Aluguéis e Despejo",
    area: "Cível / Imobiliário",
    comarca: "São Paulo - SP",
    vara: "3ª Vara Cível do Foro Central",
    court: "3ª Vara Cível do Foro Central - São Paulo/SP",
    status: "active",
    fase: "Instrução Contratual",
    stage: "Instrução Contratual",
    resumo: "Ação ajuizada em face do locatário inadimplente para reaver o imóvel comercial e liquidar os débitos locatícios.",
    description: "Ação ajuizada em face do locatário inadimplente para reaver o imóvel comercial e liquidar os débitos locatícios.",
    proximoPasso: "Aguardar manifestação do réu à contestação.",
    criadoEm: "2025-01-25T11:00:00Z",
    lastUpdate: "2026-05-20T10:00:00Z",
    atualizadoEm: "2025-01-25T11:00:00Z"
  },
  {
    id: "case_teste_1",
    clienteId: "cli_empresa_teste_ltda",
    clientName: "Empresa Teste Ltda",
    numeroProcesso: "5001234-98.2025.4.03.6100",
    caseNumber: "5001234-98.2025.4.03.6100",
    titulo: "Ação Incidental de Embargos à Execução Fiscal",
    title: "Ação Incidental de Embargos à Execução Fiscal",
    area: "Tributário",
    comarca: "São Paulo - SP",
    vara: "10ª Vara Federal Cível",
    court: "10ª Vara Federal Cível - São Paulo/SP",
    status: "active",
    fase: "Perícia Contábil",
    stage: "Perícia Contábil",
    resumo: "Embargos opostos com garantia patrimonial discutindo a inclusão indevida de taxas na Certidão de Dívida Ativa.",
    description: "Embargos opostos com garantia patrimonial discutindo a inclusão indevida de taxas na Certidão de Dívida Ativa.",
    proximoPasso: "Apresentação de quesitos complementares de perícia.",
    criadoEm: "2025-02-20T15:00:00Z",
    lastUpdate: "2026-05-22T14:00:00Z",
    atualizadoEm: "2025-02-20T15:00:00Z"
  },
  {
    id: "case_1",
    clienteId: "cli_1",
    clientName: "Giffoni Empreendimentos e Engenharia Ltda",
    numeroProcesso: "1002345-67.2025.8.26.0100",
    caseNumber: "1002345-67.2025.8.26.0100",
    titulo: "Ação Ordinária de Cobrança c/c Indenização",
    title: "Ação Ordinária de Cobrança c/c Indenização",
    area: "Cível / Engenharia",
    comarca: "São Paulo - SP",
    vara: "2ª Vara Cível da Capital",
    court: "2ª Vara Cível da Capital - SP",
    status: "active",
    fase: "Instrução e Julgamento",
    stage: "Instrução e Julgamento",
    resumo: "Cobrança de saldo credor decorrente de contrato de subempreitada e reequilíbrio econômico-financeiro.",
    description: "Cobrança de saldo credor decorrente de contrato de subempreitada e reequilíbrio econômico-financeiro.",
    proximoPasso: "Aguardando audiência de instrução designada.",
    criadoEm: "2025-01-15T10:00:00Z",
    lastUpdate: "2026-05-20T17:00:00Z",
    atualizadoEm: "2025-01-15T10:00:00Z"
  }
];

export const MOCK_EVIDENCE: Prova[] = [
  {
    id: "ev_maria_1",
    clienteId: "cli_maria_regina",
    casoId: "case_maria_1",
    nome: "Contrato de Locação Assinado",
    tipo: "Documento Contratual",
    descricao: "Via assinada digitalmente do contrato que comprova as obrigações e termos acordados.",
    title: "Contrato de Locação Assinado",
    description: "Via assinada digitalmente do contrato que comprova as obrigações e termos acordados.",
    status: "approved",
    url: "#",
    fileName: "contrato_locacao_final.pdf",
    fileSize: "1.4 MB",
    criadoEm: "2025-01-22T09:00:00Z",
    uploadedAt: "2025-01-22T09:00:00Z"
  },
  {
    id: "ev_teste_1",
    clienteId: "cli_empresa_teste_ltda",
    casoId: "case_teste_1",
    nome: "Livros Razão Contábeis Consolidados",
    tipo: "Relatório Financeiro",
    descricao: "Contém o faturamento e apuração fiscal que rechaça a glosa de tributos da Receita Federal.",
    title: "Livros Razão Contábeis Consolidados",
    description: "Contém o faturamento e apuração fiscal que rechaça a glosa de tributos da Receita Federal.",
    status: "under_review",
    url: "#",
    fileName: "livro_razao_consolidado.pdf",
    fileSize: "8.5 MB",
    criadoEm: "2025-02-25T11:00:00Z",
    uploadedAt: "2025-02-25T11:00:00Z"
  },
  {
    id: "ev_1",
    clienteId: "cli_1",
    casoId: "case_1",
    nome: "Diário de Obras - Março de 2025",
    tipo: "Relatório de Campo",
    descricao: "Relatório de presença de maquinário e dias de chuva que comprovam o atraso contratual.",
    title: "Diário de Obras - Março de 2025",
    description: "Relatório de presença de maquinário e dias de chuva que comprovam o atraso contratual.",
    status: "approved",
    url: "#",
    fileName: "diario_obras_marco25.pdf",
    fileSize: "4.2 MB",
    criadoEm: "2025-04-10T14:00:00Z",
    uploadedAt: "2025-04-10T14:00:00Z"
  }
];

// Let's create Informacoes as a specific type interface
export interface Informacao {
  id: string;
  clienteId: string;
  casoId: string;
  titulo: string;
  conteudo: string;
  visivelParaCliente: boolean;
  criadoEm: string;
}

export const MOCK_INFORMACAO: Informacao[] = [
  {
    id: "info_maria_1",
    clienteId: "cli_maria_regina",
    casoId: "case_maria_1",
    titulo: "Lembrete: Como funciona seu despejo liminar",
    conteudo: "Favor atentar para o prazo de desocupação voluntária do imóvel, que foi deferido em tutela de urgência cível.",
    visivelParaCliente: true,
    criadoEm: "2025-01-26T12:00:00Z"
  },
  {
    id: "info_teste_1",
    clienteId: "cli_empresa_teste_ltda",
    casoId: "case_teste_1",
    titulo: "Instruções Internas sobre Embargos Fiscais",
    conteudo: "Este informe é confidencial. Detalhes para reuniões estratégicas sobre a elisão de encargos aduaneiros federais.",
    visivelParaCliente: true,
    criadoEm: "2025-02-21T09:30:00Z"
  },
  {
    id: "info_confidential_1",
    clienteId: "cli_maria_regina",
    casoId: "case_maria_1",
    titulo: "Anotações Internas do Quadro Jurídico",
    conteudo: "Análise reservada sobre o score de crédito do garantidor solidário. NÃO EXIBIR AO PORTAL.",
    visivelParaCliente: false,
    criadoEm: "2025-01-28T15:00:00Z"
  }
];

export const MOCK_AUDIENCES: Audiencia[] = [
  {
    id: "aud_maria_1",
    clienteId: "cli_maria_regina",
    casoId: "case_maria_1",
    caseNumber: "1004567-12.2025.8.26.0100",
    data: "2026-06-12",
    date: "2026-06-12",
    horario: "15:00",
    time: "15:00",
    modalidade: "Virtual",
    local: "Fórum Central Cível de São Paulo, Sala Virtual de Conciliação MS",
    court: "Fórum Central Cível - Zoom do Tribunal",
    type: "Conciliação Inicial Imobiliária",
    link: "https://zoom.us/j/dummy-maria-regina",
    observacoes: "Deverá portar RG e documento comprovante da propriedade para validação perante os conciliadores.",
    notes: "Deverá portar RG e documento comprovante da propriedade para validação perante os conciliadores.",
    status: "scheduled"
  },
  {
    id: "aud_teste_1",
    clienteId: "cli_empresa_teste_ltda",
    casoId: "case_teste_1",
    caseNumber: "5001234-98.2025.4.03.6100",
    data: "2026-06-18",
    date: "2026-06-18",
    horario: "11:00",
    time: "11:00",
    modalidade: "Virtual",
    local: "Tribunal Regional Federal, Sala Virtual RFP",
    court: "Tribunal Regional Federal - Teams RFP",
    type: "Instrução Tributária e Julgamento",
    link: "https://teams.microsoft.com/l/dummy-empresa",
    observacoes: "O diretor financeiro deverá comparecer acompanhado de nosso perito assistente técnico corporativo.",
    notes: "O diretor financeiro deverá comparecer acompanhado de nosso perito assistente técnico corporativo.",
    status: "scheduled"
  },
  {
    id: "aud_1",
    clienteId: "cli_1",
    casoId: "case_1",
    caseNumber: "1002345-67.2025.8.26.0100",
    data: "2026-06-15",
    date: "2026-06-15",
    horario: "14:00",
    time: "14:00",
    modalidade: "Presencial",
    local: "Sala 204 - Fórum João Mendes Júnior, São Paulo/SP",
    court: "Sala 204 - Fórum João Mendes Júnior, São Paulo/SP",
    type: "Instrução e Julgamento",
    link: "https://teams.microsoft.com/l/meetup-join/dummy-court-link-giffoni1",
    observacoes: "Obrigatória a presença do representante legal da empresa e de nossas testemunhas arroladas.",
    notes: "Obrigatória a presença do representante legal da empresa e de nossas testemunhas arroladas.",
    status: "scheduled"
  }
];

export const MOCK_EXPERT_OPINIONS: Pericia[] = [
  {
    id: "exp_maria_1",
    clienteId: "cli_maria_regina",
    casoId: "case_maria_1",
    caseNumber: "1004567-12.2025.8.26.0100",
    data: "2026-06-08",
    date: "2026-06-08",
    horario: "14:30",
    time: "14:30",
    perito: "Dr. André Martins (Engenheiro Avaliador)",
    expertName: "Dr. André Martins (Engenheiro Avaliador)",
    local: "Rua do Imóvel Comercial, 444, Centro, São Paulo",
    objeto: "Constatação de estado de conservação do prédio alugado.",
    specialty: "Constatação de Imóveis Urbano",
    status: "scheduled",
    observacoes: "O perito irá detalhar trincas, cupins ou adulterações estruturais decorrentes de má utilização.",
    notes: "O perito irá detalhar trincas, cupins ou adulterações estruturais decorrentes de má utilização."
  },
  {
    id: "exp_teste_1",
    clienteId: "cli_empresa_teste_ltda",
    casoId: "case_teste_1",
    caseNumber: "5001234-98.2025.4.03.6100",
    data: "2026-06-11",
    date: "2026-06-11",
    horario: "10:00",
    time: "10:00",
    perito: "Dra. Sônia Abreu (Contadora Auxiliar)",
    expertName: "Dra. Sônia Abreu (Contadora Auxiliar)",
    local: "Exame em Gabinete Contábil / Remoto",
    objeto: "Auditoria analítica de recolhimentos tributários.",
    specialty: "Auditoria de Impostos Indiretos",
    status: "scheduled",
    observacoes: "Forneceremos acesso temporário ao nosso ERP contábil fiscal para agilizar o parecer homologatório.",
    notes: "Forneceremos acesso temporário ao nosso ERP contábil fiscal para agilizar o parecer homologatório."
  }
];

export const MOCK_MEETINGS: Reuniao[] = [
  {
    id: "meet_maria_1",
    clienteId: "cli_maria_regina",
    clientName: "Maria Regina",
    data: "2026-06-04",
    date: "2026-06-04",
    horario: "16:00",
    time: "16:00",
    assunto: "Revisão Final da Petição de Despejo e Testemunhos",
    subject: "Revisão Final da Petição de Despejo e Testemunhos",
    modalidade: "Virtual",
    link: "https://meet.google.com/maria-regina-meet",
    responsavel: "Dr. Roberto Giffoni",
    status: "scheduled"
  },
  {
    id: "meet_teste_1",
    clienteId: "cli_empresa_teste_ltda",
    clientName: "Empresa Teste Ltda",
    data: "2026-06-06",
    date: "2026-06-06",
    horario: "15:00",
    time: "15:00",
    assunto: "Alinhamento de Quesitos para Perícia Tributária Federal",
    subject: "Alinhamento de Quesitos para Perícia Tributária Federal",
    modalidade: "Virtual",
    link: "https://meet.google.com/empresa-teste-meet",
    responsavel: "Dra. Patrícia Lima",
    status: "scheduled"
  }
];

export const MOCK_FINANCE: Financeiro[] = [
  {
    id: "fin_maria_1",
    clienteId: "cli_maria_regina",
    casoId: "case_maria_1",
    clientName: "Maria Regina",
    descricao: "Contrato de Prestação de Honorários Cíveis Ordinários",
    valor: 8500.0,
    totalAmount: 8500.0,
    paidAmount: 5000.0,
    remainingAmount: 3500.0,
    vencimento: "2026-06-10",
    dueDate: "2026-06-10",
    status: "pending",
    formaPagamento: "Boleto Bancário ou PIX",
    linkPagamento: "https://pagar.giffoni.adv.br/boleto-maria",
    criadoEm: "2025-01-20T10:30:00Z",
    installments: [
      { number: 1, amount: 2500.0, dueDate: "2025-02-10", status: "paid" },
      { number: 2, amount: 2500.0, dueDate: "2025-03-10", status: "paid" },
      { number: 3, amount: 3500.0, dueDate: "2026-06-10", status: "pending" }
    ]
  },
  {
    id: "fin_teste_1",
    clienteId: "cli_empresa_teste_ltda",
    casoId: "case_teste_1",
    clientName: "Empresa Teste Ltda",
    descricao: "Assessoria Contratual Especializada de Defesa Fiscal Federal",
    valor: 36000.0,
    totalAmount: 36000.0,
    paidAmount: 18000.0,
    remainingAmount: 18000.0,
    vencimento: "2026-06-15",
    dueDate: "2026-06-15",
    status: "pending",
    formaPagamento: "Faturamento Corporativo C/C bancária",
    linkPagamento: "https://pagar.giffoni.adv.br/empresa-teste",
    criadoEm: "2025-02-15T15:00:00Z",
    installments: [
      { number: 1, amount: 9000.0, dueDate: "2025-03-15", status: "paid" },
      { number: 2, amount: 9000.0, dueDate: "2025-04-15", status: "paid" },
      { number: 3, amount: 9000.0, dueDate: "2026-06-15", status: "pending" },
      { number: 4, amount: 9000.0, dueDate: "2026-07-15", status: "pending" }
    ]
  }
];

// MOCK PORTAL CONFIGS
export const MOCK_PORTAL_CONFIGS: PortalConfig[] = [
  {
    clienteId: "cli_maria_regina",
    slug: "maria-regina",
    portalAtivo: true,
    permissoes: ["visualisar_documentos", "enviar_provas", "ver_financeiro", "ver_audiencias"],
    ultimoAcesso: "2026-05-25T14:20:00Z",
    criadoEm: "2025-01-20T10:00:00Z"
  },
  {
    clienteId: "cli_empresa_teste_ltda",
    slug: "empresa-teste-ltda",
    portalAtivo: true,
    permissoes: ["visualisar_documentos", "enviar_provas", "ver_financeiro", "ver_audiencias", "ver_pericias"],
    ultimoAcesso: "2026-05-24T18:45:00Z",
    criadoEm: "2025-02-15T14:00:00Z"
  }
];

// HELPER API MOCK SERVICES FOR GETTING CLIENT BY SLUG OR ID
export function getClientBySlug(slug: string): Cliente | undefined {
  return MOCK_CLIENTS.find(c => c.slug === slug);
}

export function getDataForClient(clientId: string) {
  const client = MOCK_CLIENTS.find(c => c.id === clientId);
  return {
    client,
    cases: MOCK_CASES.filter(c => c.clienteId === clientId),
    evidence: MOCK_EVIDENCE.filter(e => e.clienteId === clientId),
    audiences: MOCK_AUDIENCES.filter(a => a.clienteId === clientId),
    expertOpinions: MOCK_EXPERT_OPINIONS.filter(e => e.clienteId === clientId),
    meetings: MOCK_MEETINGS.filter(m => m.clienteId === clientId),
    finance: MOCK_FINANCE.filter(f => f.clienteId === clientId),
    informacoes: MOCK_INFORMACAO.filter(i => i.clienteId === clientId && i.visivelParaCliente)
  };
}
