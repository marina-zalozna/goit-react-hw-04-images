import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import axios from 'axios';
import Notiflix from 'notiflix';

import css from './App.module.css';

export function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (search !== '') {
        const URL = 'https://pixabay.com/api/';
        const KEY = '31527822-d896c43457d7744fdc6719ea3';
        const fetchPosts  = () => {
          axios.get(`${URL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
            setTotal(response.data.total)
            return response.data.hits
          })
          .then(data => {
            const dataArray = [];
            data.map(({ id, webformatURL, largeImageURL }) => dataArray.push({ id, webformatURL, largeImageURL }))
            if (dataArray.length === 0) {
              Notiflix.Notify.failure('not found any picture!');
            }
            return dataArray
          })
          .then((newCards) => {
            return setCards(cards => [...cards, ...newCards])
          })
          .catch(error => {
            setError(error)
            Notiflix.Notify.failure('sorry, we have a problem')
          })
          .finally(() => {
            setLoading(false)
          })
        }
        fetchPosts()
      }
    }, [search, page])

      const onSubmit = e => {
        e.preventDefault();
        const searchValue = e.target.elements.searchInput.value;
        if (searchValue !== '' && searchValue !== search) {
          setCards([]);
          setSearch(searchValue);
          setPage(1);
          setError('');
          setLoading(true);
        } else if (searchValue === '') {
          Notiflix.Notify.info('input is empty!');
        }
      };

      // useEffect((prevProps, prevState) => {
      //   if (search !== prevState.search || page !== prevState.page) { return;}};

      const onLoadMore = () => {
        setPage(page + 1);
        setLoading(true)
      };

      const toggleModal = showModal => setShowModal(!showModal);

      const openModal = largeImageURL => {
        setModalImage(largeImageURL);
        toggleModal();
      };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery cards={cards} onOpen={openModal} />
      {loading && <Loader />}
      {cards.length > 1 && <Button onLoadMore={onLoadMore} />}
      {showModal && modalImage && (
        <Modal onClose={toggleModal} modalImage={modalImage} />
      )}
    </div>
  );
}

// import React from 'react';
// import { Searchbar } from './Searchbar/Searchbar';
// import { Button } from './Button/Button';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
// import axios from 'axios';
// import Notiflix from 'notiflix';

// import css from './App.module.css';

// export class App extends React.Component {
//   state = {
//     URL: 'https://pixabay.com/api/',
//     KEY: '31527822-d896c43457d7744fdc6719ea3',
//     cards: [],
//     search: "",
//     error: "",
//     loading: false,
//     page: 1,
//     showModal: false,
//     modalImage: null,
//   }
//   fetchPosts = () => {
//     const { search, page, URL, KEY } = this.state

//     axios.get(`${URL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//     .then(response => response.data.hits)
//     .then(data => {
//       const dataArray = [];
//       data.map(({ id, webformatURL, largeImageURL }) =>dataArray.push({ id, webformatURL, largeImageURL })
//       )
//       if (dataArray.length === 0) {
//         Notiflix.Notify.failure('not found any picture!');
//       }
//       return dataArray
//     }
//     )
//     .then( (newCards) => {
//         this.setState((prevState) => {
//           if (prevState.cards.length === 0) {
//         return {
//         cards: newCards,
//       }
//       } else {

//         return {
//           cards: [...prevState.cards, ...newCards]
//         }
//       }

//       })
//     })
//     .catch(error => {
//       this.setState({
//         error
//       })
//     })
//       .finally(() => this.setState({
//         loading: false,
//       })
//       )
//   }

//   onSubmit = (e) => {
//     e.preventDefault()
//     const searchValue = e.target.elements.searchInput.value
//     if (searchValue !== "" && searchValue !== this.state.search) {
//       this.setState({
//       cards: [],
//       search: searchValue,
//       page: 1,
//       loading: true,

//     })
//     } else if (searchValue === "") {
//       Notiflix.Notify.info('input is empty!');
//     }

//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.search !== prevState.search || this.state.page !== prevState.page) {
//       setTimeout(this.fetchPosts, 200)
//     }
//   }

//   onLoadMore = () => {
//     this.setState((prevState) => {
//       return {
//         page: prevState.page + 1,
//         loading: true,
//       }
//     })
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal, }));
//   }

//   openModal = (largeImageURL) => {
//     this.setState({
//       modalImage: largeImageURL,
//     })
//     this.toggleModal()

//   }
//  render() {
//   const {showModal,modalImage,cards,loading} = this.state
//   return (
//     <div className={css.App}>
//       <Searchbar onSubmit={this.onSubmit} />
//       <ImageGallery cards={cards} onOpen={this.openModal} />
//       {loading && <Loader/>}
//       {cards.length > 1 && <Button onLoadMore={this.onLoadMore} />}
//       {showModal && modalImage && (<Modal onClose={this.toggleModal} modalImage={modalImage} />)}
//     </div>
//   );
//  }
// }
