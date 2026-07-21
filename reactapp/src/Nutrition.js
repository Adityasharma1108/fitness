import React, { useState } from 'react';

const dietData = {
  veg: [
    {
      id: 'v1',
      title: 'High-Protein Soya Chunk Bowl',
      category: 'Lunch / Dinner',
      calories: '450 kcal',
      protein: '42g',
      carbs: '35g',
      fats: '10g',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Boiled soya chunks tossed with colorful bell peppers, onions, olive oil, and mint chutney. Highest protein per gram for vegetarian lifters.'
    },
    {
      id: 'v2',
      title: 'Paneer Tikka & Quinoa Meal',
      category: 'Dinner',
      calories: '520 kcal',
      protein: '30g',
      carbs: '40g',
      fats: '22g',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Grilled low-fat cottage cheese cubes served over fluffy cooked quinoa and roasted cucumbers with lemon dressing.'
    },
    {
      id: 'v3',
      title: 'Oats, Peanut Butter & Whey Shake',
      category: 'Breakfast / Pre-Workout',
      calories: '580 kcal',
      protein: '38g',
      carbs: '65g',
      fats: '16g',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Blend of rolled oats, 1 scoop plant/whey protein, 2 tbsp natural peanut butter, chia seeds, and almond milk for quick clean mass gain.'
    },
    {
      id: 'v4',
      title: 'Sprouted Moong & Chickpea Salad',
      category: 'Snack / Light Dinner',
      calories: '310 kcal',
      protein: '20g',
      carbs: '48g',
      fats: '4g',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Raw sprouted green gram and boiled chickpeas tossed with pomegranates, tomatoes, chat masala, and fresh cilantro.'
    }
  ],
  nonVeg: [
    {
      id: 'nv1',
      title: 'Grilled Herb Chicken Breast & Rice',
      category: 'Lunch',
      calories: '480 kcal',
      protein: '52g',
      carbs: '45g',
      fats: '8g',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Lean chicken breast marinated in garlic, rosemary, and olive oil, served with steamed basmati rice and boiled broccoli.'
    },
    {
      id: 'nv2',
      title: 'Classic 6 Egg-White Omelette & Toast',
      category: 'Breakfast',
      calories: '360 kcal',
      protein: '32g',
      carbs: '28g',
      fats: '6g',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Whisked egg whites cooked with spinach and tomatoes, paired with 2 slices of toasted whole wheat brown bread.'
    },
    {
      id: 'nv3',
      title: 'Pan-Seared Salmon & Asparagus',
      category: 'Dinner',
      calories: '510 kcal',
      protein: '40g',
      carbs: '12g',
      fats: '28g',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Rich in Omega-3 fatty acids, fresh wild salmon fillet seared in olive oil served with grilled asparagus spears and lemon.'
    },
    {
      id: 'nv4',
      title: 'Minced Turkey / Lean Beef & Sweet Potato',
      category: 'Post-Workout Meal',
      calories: '530 kcal',
      protein: '45g',
      carbs: '50g',
      fats: '12g',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Sauteed extra-lean ground meat cooked with bell peppers, served alongside roasted cinnamon sweet potato wedges.'
    }
  ]
};

const Nutrition = () => {
  const [dietType, setDietType] = useState('veg');
  const [activeMeal, setActiveMeal] = useState(null);

  const meals = dietData[dietType];

  return (
    <section style={{ minHeight: '100vh', background: '#050505', color: '#ffffff', padding: '120px 4% 60px 4%', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ background: 'rgba(204, 255, 0, 0.15)', color: '#ccff00', border: '1px solid #ccff00', padding: '6px 18px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
            🥗 ANABOLIC NUTRITION GUIDE
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '15px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
            NUTRITION & <span style={{ color: '#ccff00' }}>MEAL PLANS</span>
          </h1>
          <p style={{ color: '#cccccc', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Fuel your gains with tailored meal plans mapped with exact macros for your daily caloric targets.
          </p>

          {/* TOGGLE SWITCH */}
          <div style={{ marginTop: '35px', display: 'inline-flex', background: '#141414', padding: '6px', borderRadius: '35px', border: '1px solid #333' }}>
            <button
              onClick={() => {
                setDietType('veg');
                setActiveMeal(null);
              }}
              style={{
                padding: '12px 32px',
                borderRadius: '30px',
                border: 'none',
                background: dietType === 'veg' ? '#ccff00' : 'transparent',
                color: dietType === 'veg' ? '#000000' : '#ffffff',
                fontWeight: '800',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              🟢 VEGETARIAN DIET
            </button>

            <button
              onClick={() => {
                setDietType('nonVeg');
                setActiveMeal(null);
              }}
              style={{
                padding: '12px 32px',
                borderRadius: '30px',
                border: 'none',
                background: dietType === 'nonVeg' ? '#ff3333' : 'transparent',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              🔴 NON-VEGETARIAN DIET
            </button>
          </div>
        </div>

        {/* MEALS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {meals.map((meal) => (
            <div 
              key={meal.id}
              style={{
                background: '#111111',
                border: '1px solid #2a2a2a',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#ccff00';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img src={meal.image} alt={meal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#000000',
                    color: '#ccff00',
                    border: '1px solid #ccff00',
                    padding: '6px 14px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                  }}>
                    {meal.category}
                  </span>
                </div>

                <div style={{ padding: '25px 20px 15px 20px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px', color: '#ffffff' }}>{meal.title}</h3>
                  <p style={{ color: '#dddddd', fontSize: '0.95rem', lineHeight: '1.6', height: '65px', overflow: 'hidden' }}>{meal.description}</p>
                </div>
              </div>

              {/* MACROS HUD */}
              <div style={{ padding: '0 20px 20px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#1c1c1c', padding: '12px', borderRadius: '12px', border: '1px solid #333333', textAlign: 'center', marginBottom: '15px' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#aaaaaa', fontWeight: 'bold' }}>CALORIES</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ccff00', marginTop: '3px' }}>{meal.calories}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#aaaaaa', fontWeight: 'bold' }}>PROTEIN</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ffffff', marginTop: '3px' }}>{meal.protein}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#aaaaaa', fontWeight: 'bold' }}>CARBS</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ffffff', marginTop: '3px' }}>{meal.carbs}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#aaaaaa', fontWeight: 'bold' }}>FATS</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ffffff', marginTop: '3px' }}>{meal.fats}</div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveMeal(meal)}
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '10px',
                    border: '1px solid #ccff00',
                    background: '#182400',
                    color: '#ccff00',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#ccff00';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#182400';
                    e.currentTarget.style.color = '#ccff00';
                  }}
                >
                  VIEW PREPARATION GUIDE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL OVERLAY */}
        {activeMeal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: '#111111',
              border: '2px solid #ccff00',
              borderRadius: '24px',
              maxWidth: '550px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 0 50px rgba(204,255,0,0.3)'
            }}>
              <button 
                onClick={() => setActiveMeal(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: '#222222', color: '#ffffff', border: '1px solid #444', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✕
              </button>

              <h2 style={{ fontSize: '1.8rem', color: '#ccff00', marginBottom: '15px' }}>{activeMeal.title}</h2>
              <p style={{ color: '#eeeeee', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '25px' }}>{activeMeal.description}</p>

              <div style={{ background: '#1c1c1c', padding: '18px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #333' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#ffffff', fontSize: '1.1rem' }}>Nutritional Breakdown</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dddddd', fontSize: '0.95rem' }}>
                  <span>Calories: <strong style={{ color: '#ccff00' }}>{activeMeal.calories}</strong></span>
                  <span>Protein: <strong style={{ color: '#ffffff' }}>{activeMeal.protein}</strong></span>
                  <span>Carbs: <strong style={{ color: '#ffffff' }}>{activeMeal.carbs}</strong></span>
                  <span>Fats: <strong style={{ color: '#ffffff' }}>{activeMeal.fats}</strong></span>
                </div>
              </div>

              <button 
                onClick={() => setActiveMeal(null)}
                style={{ width: '100%', padding: '14px', background: '#ccff00', color: '#000000', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Nutrition;