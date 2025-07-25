import React, { useState, useEffect } from 'react';

// Telegram WebApp types
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
      };
    };
  }
}

interface Professional {
  id: number;
  name: string;
  title: string;
  emoji: string;
  ring: number;
  rating: number;
  hourlyRate: number;
  description: string;
}

const App: React.FC = () => {
  const [brainExpanded, setBrainExpanded] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [searchResults, setSearchResults] = useState<Professional[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dados dos profissionais exatamente como está no Replit
  const professionals: Professional[] = [
    { id: 1, name: "Carlos Silva", title: "Desenvolvedor Full-Stack", emoji: "👨‍💻", ring: 1, rating: 4.8, hourlyRate: 120, description: "Especialista em React, Node.js e PostgreSQL com 8 anos de experiência" },
    { id: 2, name: "Ana Costa", title: "Designer UX/UI", emoji: "👩‍🎨", ring: 1, rating: 4.9, hourlyRate: 100, description: "Design de interfaces modernas e experiência do usuário otimizada" },
    { id: 3, name: "João Santos", title: "Engenheiro Civil", emoji: "👨‍🔧", ring: 1, rating: 4.7, hourlyRate: 150, description: "Projetos estruturais e acompanhamento de obras residenciais e comerciais" },
    { id: 4, name: "Maria Lima", title: "Médica Cardiologista", emoji: "👩‍⚕️", ring: 1, rating: 5.0, hourlyRate: 300, description: "Especialista em doenças cardiovasculares com atendimento domiciliar" },
    { id: 5, name: "Pedro Souza", title: "Advogado Empresarial", emoji: "👨‍💼", ring: 2, rating: 4.6, hourlyRate: 200, description: "Consultoria jurídica para empresas e contratos comerciais" },
    { id: 6, name: "Julia Ramos", title: "Professora de Idiomas", emoji: "👩‍🏫", ring: 2, rating: 4.8, hourlyRate: 80, description: "Aulas particulares de inglês e espanhol para todos os níveis" },
    { id: 7, name: "Bruno Alves", title: "Chef Particular", emoji: "👨‍🍳", ring: 2, rating: 4.9, hourlyRate: 180, description: "Serviços de chef em domicílio e eventos especiais" },
    { id: 8, name: "Carla Dias", title: "Arquiteta", emoji: "👩‍💼", ring: 2, rating: 4.7, hourlyRate: 140, description: "Projetos arquitetônicos residenciais e comerciais" },
    { id: 9, name: "Rafael Cruz", title: "Piloto de Drone", emoji: "👨‍✈️", ring: 2, rating: 4.8, hourlyRate: 250, description: "Filmagens aéreas profissionais e inspeções técnicas" },
    { id: 10, name: "Lucia Melo", title: "Cientista de Dados", emoji: "👩‍🔬", ring: 3, rating: 5.0, hourlyRate: 180, description: "Análise de dados e machine learning para empresas" },
    { id: 11, name: "Diego Nunes", title: "Fotógrafo", emoji: "👨‍📷", ring: 3, rating: 4.6, hourlyRate: 120, description: "Fotografia profissional para eventos e ensaios" },
    { id: 12, name: "Beatriz Moura", title: "Cantora", emoji: "👩‍🎤", ring: 3, rating: 4.9, hourlyRate: 300, description: "Apresentações musicais para eventos e cerimônias" },
    { id: 13, name: "Thiago Lopes", title: "Agricultor Urbano", emoji: "👨‍🌾", ring: 3, rating: 4.7, hourlyRate: 100, description: "Consultoria em agricultura urbana e hortas domésticas" },
    { id: 14, name: "Fernanda Rocha", title: "Enfermeira", emoji: "👩‍⚕️", ring: 3, rating: 4.8, hourlyRate: 90, description: "Cuidados domiciliares e acompanhamento de idosos" },
    { id: 15, name: "Gabriel Ferreira", title: "Personal Trainer", emoji: "👨‍🚒", ring: 3, rating: 5.0, hourlyRate: 110, description: "Treinamento personalizado e reabilitação física" },
    { id: 16, name: "Amanda Ribeiro", title: "Consultora Financeira", emoji: "👩‍💼", ring: 3, rating: 4.7, hourlyRate: 160, description: "Planejamento financeiro pessoal e investimentos" },
  ];

  useEffect(() => {
    // Telegram Mini App initialization
    if (window.Telegram?.WebApp) {
      console.log('🤖 Telegram Mini App inicializado!');
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleBrainClick = () => {
    setBrainExpanded(!brainExpanded);
    setIsSearchActive(!isSearchActive);
    
    if (!brainExpanded) {
      // Neural brain activation sound effect
      try {
        const utterance = new SpeechSynthesisUtterance('Orbitrum');
        utterance.rate = 0.8;
        utterance.pitch = 0.7;
        speechSynthesis.speak(utterance);
      } catch (e) {
        console.log('Voice not available');
      }
    }
  };

  const handleProfessionalClick = (prof: Professional) => {
    setSelectedProfessional(prof);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const results = professionals.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.title.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const displayedProfessionals = isSearchActive && searchResults.length > 0 
    ? searchResults 
    : professionals.filter(p => p.rating >= 4.8).slice(0, 10);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 text-center mb-8 animate-pulse">
          ORBITRUM CONNECT
        </h1>

        {/* Search Bar */}
        {isSearchActive && (
          <div className="w-full max-w-md mb-8">
            <input
              type="text"
              placeholder="Buscar profissionais..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-2 border-cyan-400 focus:border-cyan-300 outline-none"
              autoFocus
            />
          </div>
        )}

        {/* Orbital System */}
        <div className="relative w-96 h-96 md:w-[500px] md:h-[500px]">
          {/* Orbital Rings */}
          {!isSearchActive && [1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute border border-cyan-400/30 rounded-full"
              style={{
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `spin ${10 + ring * 5}s linear infinite ${ring % 2 === 0 ? 'reverse' : 'normal'}`
              }}
            />
          ))}

          {/* Professional Orbs */}
          {displayedProfessionals.map((prof, index) => {
            if (isSearchActive) {
              // Grid layout for search results
              const cols = 3;
              const row = Math.floor(index / cols);
              const col = index % cols;
              const x = (col - 1) * 100;
              const y = (row - 1) * 100;
              
              return (
                <div
                  key={prof.id}
                  className="absolute w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center cursor-pointer text-xl shadow-lg hover:scale-110 transition-all duration-300"
                  style={{
                    left: `calc(50% + ${x}px - 32px)`,
                    top: `calc(50% + ${y}px - 32px)`,
                    boxShadow: "0 0 15px rgba(34, 211, 238, 0.6)"
                  }}
                  onClick={() => handleProfessionalClick(prof)}
                >
                  {prof.emoji}
                </div>
              );
            } else {
              // Original orbital layout
              const angle = (360 / professionals.filter(p => p.ring === prof.ring).length) * 
                professionals.filter(p => p.ring === prof.ring).findIndex(p => p.id === prof.id);
              const radius = prof.ring * 60;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={prof.id}
                  className="absolute w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center cursor-pointer text-xl shadow-lg hover:scale-110 transition-all duration-300"
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                    boxShadow: "0 0 15px rgba(34, 211, 238, 0.6)"
                  }}
                  onClick={() => handleProfessionalClick(prof)}
                >
                  {prof.emoji}
                </div>
              );
            }
          })}

          {/* Neural Brain Central */}
          <div
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full border-4 border-white cursor-pointer flex items-center justify-center text-4xl shadow-xl transition-all duration-300 ${brainExpanded ? 'scale-125' : 'scale-100'} hover:scale-110`}
            style={{
              boxShadow: brainExpanded 
                ? "0 0 30px #00ffff, 0 0 60px #00ffff" 
                : "0 0 20px #00ffff, 0 0 40px #00ffff"
            }}
            onClick={handleBrainClick}
          >
            🧠
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-lg text-cyan-400 hover:text-yellow-400 transition-colors duration-300">
            Conecte-se com profissionais próximos
          </p>
          <p className="text-sm text-gray-400" style={{ fontSize: '0.9em' }}>
            Clique no Cérebro Neural para começar
          </p>
        </div>

        {/* Status */}
        <div className="absolute bottom-8 text-center">
          <div className="text-green-400 text-sm">
            ✅ Sistema Neural Ativo
          </div>
          <div className="text-cyan-400 text-xs">
            🚀 {displayedProfessionals.length} Profissionais Online
          </div>
        </div>
      </div>

      {/* Professional Modal */}
      {selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border-2 border-cyan-400">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{selectedProfessional.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedProfessional.name}</h3>
                  <p className="text-cyan-400">{selectedProfessional.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProfessional(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white">{selectedProfessional.rating}/5.0</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-green-400">💰</span>
                <span className="text-white">R$ {selectedProfessional.hourlyRate}/hora</span>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedProfessional.description}
              </p>
              
              <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-300 hover:to-blue-500 transition-all duration-300">
                🚀 Conectar Agora
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default App;