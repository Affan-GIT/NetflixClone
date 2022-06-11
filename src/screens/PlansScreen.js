import React, { useEffect, useState } from 'react';
import db from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import './PlansScreen.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('active', '==', true));
    getDocs(q).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceRef = collection(db, 'products', productDoc.id, 'prices');
        const priceSnap = await getDocs(priceRef);
        priceSnap.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);
  useEffect(() => {
    if (user.uid) {
      const subRef = collection(db, 'customers', user?.uid, 'subscriptions');
      getDocs(subRef).then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          const subData = subscription?.data();
          setSubscription({
            role: subData.role,
            currentPeriodEnd: subData.current_period_end.seconds,
            currentPeriodStart: subData.current_period_start.seconds,
          });
        });
      });
    }
  }, [user.uid]);
  const loadCheckOut = async (priceId) => {
    const checkoutCol = await collection(
      db,
      'customers',
      user.uid,
      'checkout_sessions'
    );
    const docRef = await addDoc(checkoutCol, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          'pk_test_51L98yESHC7TRsAXiiSzYYNbffpGV7ss2jWkQVXu3ubvElU7MlMN6ip08i1hUo9qRFWITVFcBB4WPnxYLipHHv5O800dHIPWODz'
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='plansScreen'>
      <br />
      {subscription && (
        <p>
          Renewal Date:{' '}
          {new Date(subscription?.currentPeriodEnd * 1000).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            className={`${
              isCurrentPackage && 'plansScreen__plan--disabled'
            } plansScreen__plan`}
            key={productId}
          >
            <div className='plansScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckOut(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
