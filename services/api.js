import axios from 'axios';

// Substitua 'YOUR_API_KEY' pela sua chave de API real
const API_KEY = '9ba307d6';
const BASE_URL = 'https://www.omdbapi.com/';

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Função para buscar filmes por termo de pesquisa
export const searchMovies = async (searchTerm) => {
  try {
    const response = await api.get('', {
      params: {
        s: searchTerm,
        type: 'movie',
      },
    });
    if (response.data.Response === 'True') {
      return response.data.Search;
    } else {
      throw new Error(response.data.Error || 'Filmes não encontrados');
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

// Função para buscar detalhes de um filme específico por ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get('', {
      params: {
        i: movieId,
        plot: 'full', // Para obter sinopse completa
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error(response.data.Error || 'Detalhes do filme não encontrados');
    }
  } catch (error) {
    console.error('Erro ao obter detalhes do filme:', error);
    throw error;
  }
};

export default api;

// const API_KEY = '39f91ac0';
// const BASE_URL = 'https://www.omdbapi.com/';

// // Função para montar a URL com parâmetros
// const buildUrl = (params) => {
//   const url = new URL(BASE_URL);
//   params.apikey = API_KEY;

//   Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

//   return url.toString();
// };

// // Função para buscar filmes por termo de pesquisa
// export const searchMovies = async (searchTerm) => {
//   try {
//     const url = buildUrl({ s: searchTerm, type: 'movie' });
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.Response === 'True') {
//       return { success: true, data: data.Search };
//     } else {
//       return { success: false, error: data.Error || 'Filmes não encontrados' };
//     }
//   } catch (error) {
//     console.error('Erro ao buscar filmes:', error);
//     return { success: false, error: 'Erro ao conectar com o servidor.' };
//   }
// };

// // Função para buscar detalhes de um filme específico por ID
// export const getMovieDetails = async (movieId) => {
//   try {
//     const url = buildUrl({ i: movieId, plot: 'full' });
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.Response === 'True') {
//       return { success: true, data };
//     } else {
//       return { success: false, error: data.Error || 'Detalhes do filme não encontrados' };
//     }
//   } catch (error) {
//     console.error('Erro ao obter detalhes do filme:', error);
//     return { success: false, error: 'Erro ao conectar com o servidor.' };
//   }
// };

