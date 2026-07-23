import { showAlert } from './alert';
import axios from 'axios';

export const bookTour = async (tourId) => {
  try {
    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
    });
    // console.log(session);
    window.location.assign(session.data.session.url);
  } catch (err) {
    showAlert('error', err);
  }
};
