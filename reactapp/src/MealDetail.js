import React from 'react';
import { useParams, Link } from 'react-router-dom';

const MealDetail = () => {
  const { mealId } = useParams();

  // Diet plan details array mapped with unique IDs
  const mealData = {
    '1': {
      title: 'Eggs & Oatmeal Fuel',
      type: 'Breakfast',
      calories: '450 kcal',
      proteins: '30g',
      carbs: '55g',
      fats: '12g',
      description: 'The ultimate morning fuel designed for sustained energy releases, low glycemic carbs, and premium bioavailable whole proteins.',
      ingredients: ['3 Egg Whites + 1 Whole Egg', '50g Rolled Oats', '1 tbsp Honey', 'Handful of Berries'],
      instructions: 'Oats ko pani ya skimmed milk ke sath boil karein. Side mein eggs ko scramble ya boil kar lein. Honey aur berries ke sath warm serve karein.'
    },
    '2': {
      title: 'Grilled Chicken & Rice',
      type: 'Lunch',
      calories: '750 kcal',
      proteins: '50g',
      carbs: '85g',
      fats: '15g',
      description: 'Classic bodybuilder nutrition core stack optimized for quick muscular recovery, high caloric density, and complex carb loading.',
      ingredients: ['200g Lean Chicken Breast', '100g Basmati Rice (Cooked)', 'Broccoli & Bell Peppers', '1 tsp Olive Oil'],
      instructions: 'Chicken breast ko herbs ke sath marinate karke grill karein. Rice ko steam karein aur vegetables ko halka olive oil mein stir-fry karke plate taiyar karein.'
    },
    '3': {
      title: 'Avocado Salad & Sprouts',
      type: 'Dinner',
      calories: '300 kcal',
      proteins: '12g',
      carbs: '25g',
      fats: '18g',
      description: 'Lean metabolic booster prioritizing healthy essential monounsaturated fatty acids and active plant fibers for easy nighttime digestion.',
      ingredients: ['1/2 Medium Avocado', '1 Cup Mixed Sprouted Moong', 'Cucumber & Tomato slices', 'Lemon juice dressing'],
      instructions: 'Sprouts ko steaming loop mein thoda soft karein. Avocado chunks ke sath mix karke veggies, salt, black pepper aur lemon juice mix karke fresh consume karein.'
    },
    '4': {
      title: 'Whey Shake & Almonds',
      type: 'Snack',
      calories: '350 kcal',
      proteins: '28g',
      carbs: '10g',
      fats: '14g',
      description: 'Fast-absorbing post-workout nutrient replenishment structure designed to prevent catabolic state and fuel muscle protein synthesis.',
      ingredients: ['1 Scoop Whey Protein Isolate', '250ml Cold Water / Almond Milk', '10-12 Raw Almonds'],
      instructions: 'Whey protein ko shaker container mein cold fluid ke sath smooth mix karein aur immediate premium fat source ke liye raw almonds ke sath consume karein.'
    }
  };

  const meal = mealData[mealId];

  if (!meal) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a', color: '#fff' }}>
        <h2 style={{ color: '#ff4d4d' }}>Meal Routine Not Tracked</h2>
        <Link to="/nutrition" style={{ marginTop: '20px', color: '#ccff00', fontWeight: 'bold' }}>Back to Nutrition Hub</Link>
      </div>
    );
  }

  return (
    <section className="page-section" style={{ minHeight: '100vh', background: '#050505', color: '#fff', padding: '120px 4% 60px 4%' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Navigation Action */}
        <Link to="/nutrition" style={{ color: '#ccff00', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', marginBottom: '30px', transition: '0.3s' }}
          onMouseOver={(e) => e.target.style.transform = 'translateX(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateX(0)'}
        >
          ← BACK TO NUTRITION HUB
        </Link>

        {/* Hero Section Container */}
        <div style={{ background: 'linear-gradient(145deg, #111, #161616)', border: '1px solid #222', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ position: 'absolute', top: '25px', right: '30px', background: 'rgba(204, 255, 0, 0.1)', border: '1px solid #ccff00', color: '#ccff00', padding: '5px 15px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {meal.type}
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '15px', letterSpacing: '-0.5px' }}>{meal.title}</h1>
          <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '35px' }}>{meal.description}</p>

          {/* Macros Telemetry Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {[
              { label: 'ENERGY', val: meal.calories, color: '#ccff00' },
              { label: 'PROTEINS', val: meal.proteins, color: '#00e5ff' },
              { label: 'CARBOHYDRATES', val: meal.carbs, color: '#ffea00' },
              { label: 'FAT ACCELERATION', val: meal.fats, color: '#ff3d00' }
            ].map((macro, idx) => (
              <div key={idx} style={{ background: '#0d0d0d', padding: '20px', borderRadius: '12px', border: '1px solid #1f1f1f', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 'bold', letterSpacing: '1px' }}>{macro.label}</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '8px', color: macro.color }}>{macro.val}</div>
              </div>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '30px 0' }} />

          {/* Details Segment Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            {/* Ingredients Component */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#ccff00', marginBottom: '15px', fontWeight: '700' }}>INGREDIENTS SPEC</h3>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#ccc', lineHeight: '2' }}>
                {meal.ingredients.map((ing, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Prep Steps Component */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#ccff00', marginBottom: '15px', fontWeight: '700' }}>PREPARATION PATHWAY</h3>
              <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                {meal.instructions}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MealDetail;