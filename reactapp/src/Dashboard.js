import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATABASE FOR WORKOUTS ---
// Future mein aap isey backend se replace kar sakte ho
const workoutData = [
  {
    id: 'chest',
    name: 'CHEST',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4 Sets x 8-10 Reps', desc: 'Keep your back flat on the bench, grip slightly wider than shoulder-width. Lower the bar to your mid-chest and push up explosively.' },
      { name: 'Incline Dumbbell Press', sets: '3 Sets x 10-12 Reps', desc: 'Set bench to 30-45 degrees. Push dumbbells up and together, focusing on the upper chest contraction.' },
      { name: 'Cable Crossovers', sets: '3 Sets x 15 Reps', desc: 'Step forward, keep a slight bend in your elbows, and bring the cables together in a hugging motion.' }
    ]
  },
  {
    id: 'back',
    name: 'BACK',
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    exercises: [
      { name: 'Deadlift', sets: '4 Sets x 5-8 Reps', desc: 'Keep a neutral spine, hinge at the hips, and drive through your legs to lift the bar. Squeeze glutes at the top.' },
      { name: 'Lat Pulldown', sets: '4 Sets x 10-12 Reps', desc: 'Grip wide, pull the bar down to your upper chest while squeezing your shoulder blades together.' },
      { name: 'Barbell Row', sets: '3 Sets x 10 Reps', desc: 'Bend at hips, keep back straight, and pull the bar towards your belly button.' }
    ]
  },
  {
    id: 'biceps',
    name: 'BICEPS',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    exercises: [
      { name: 'Barbell Curl', sets: '4 Sets x 10 Reps', desc: 'Stand straight, keep elbows tucked to your sides, and curl the bar up without using momentum.' },
      { name: 'Hammer Curls', sets: '3 Sets x 12 Reps', desc: 'Hold dumbbells with a neutral grip (palms facing each other) and curl upwards to target the brachialis.' },
      { name: 'Preacher Curls', sets: '3 Sets x 12-15 Reps', desc: 'Rest arms on the pad, fully extend at the bottom, and squeeze hard at the top.' }
    ]
  },
  {
    id: 'triceps',
    name: 'TRICEPS',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    exercises: [
      { name: 'Tricep Rope Pushdown', sets: '4 Sets x 12 Reps', desc: 'Keep elbows locked at your sides. Push the rope down and spread the ends at the bottom for maximum contraction.' },
      { name: 'Overhead Dumbbell Extension', sets: '3 Sets x 10-12 Reps', desc: 'Hold a dumbbell overhead with both hands, lower it behind your head, and extend back up.' },
      { name: 'Close-Grip Bench Press', sets: '3 Sets x 8-10 Reps', desc: 'Grip the bar shoulder-width apart. Keep elbows tucked in close to your body as you press.' }
    ]
  },
  {
    id: 'shoulders',
    name: 'SHOULDERS',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    exercises: [
      { name: 'Overhead Military Press', sets: '4 Sets x 8-10 Reps', desc: 'Core tight, press the barbell straight up over your head until arms are fully extended.' },
      { name: 'Dumbbell Lateral Raises', sets: '4 Sets x 15 Reps', desc: 'Raise dumbbells to the side until arms are parallel to the floor. Control the weight on the way down.' },
      { name: 'Face Pulls', sets: '3 Sets x 15 Reps', desc: 'Use a rope attachment, pull towards your face, flaring elbows out to target rear delts.' }
    ]
  },
  {
    id: 'legs',
    name: 'LEGS',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    exercises: [
      { name: 'Barbell Squats', sets: '4 Sets x 8 Reps', desc: 'Keep chest up, break parallel with your thighs, and drive back up through your heels.' },
      { name: 'Leg Press', sets: '3 Sets x 10-12 Reps', desc: 'Place feet shoulder-width apart on the sled. Lower the weight under control and push back up (do not lock knees).' },
      { name: 'Bulgarian Split Squats', sets: '3 Sets x 10 Reps (Each Leg)', desc: 'Rest one foot on a bench behind you, squat down with the front leg until thigh is parallel to the ground.' }
    ]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('WELCOME BACK');
  const [selectedMuscle, setSelectedMuscle] = useState(null); // State to toggle views

  const userName = localStorage.getItem('user_name') || 'Athlete';

  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting('GOOD MORNING');
    else if (hrs < 18) setGreeting('GOOD AFTERNOON');
    else setGreeting('GOOD EVENING');
  }, []);

  return (
    <section style={{ minHeight: '100vh', background: '#050505', color: '#fff', padding: '120px 4% 60px 4%', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderBottom: '1px solid #1a1a1a', paddingBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '2.8rem', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>
              {greeting}, <span style={{ color: '#ccff00', textTransform: 'uppercase' }}>{userName}</span>
            </h1>
            <p style={{ color: '#777', marginTop: '10px', fontSize: '1.05rem' }}>Your personal interactive workout and anatomy guide.</p>
          </div>
          
          <button 
            onClick={() => {
              localStorage.removeItem('user_token');
              localStorage.removeItem('elitefit_token');
              navigate('/login');
            }}
            style={{ padding: '8px 20px', background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            LOGOUT
          </button>
        </div>

        {/* --- VIEW 1: MUSCLE GROUP GRID --- */}
        {!selectedMuscle ? (
          <>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '30px', textTransform: 'uppercase' }}>
              Select a <span style={{ color: '#ccff00' }}>Target Muscle</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {workoutData.map((muscle) => (
                <div 
                  key={muscle.id}
                  onClick={() => setSelectedMuscle(muscle)}
                  style={{
                    position: 'relative',
                    height: '250px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#ccff00';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.querySelector('.overlay').style.background = 'rgba(0,0,0,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.querySelector('.overlay').style.background = 'rgba(0,0,0,0.7)';
                  }}
                >
                  <img src={muscle.image} alt={muscle.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div 
                    className="overlay"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', transition: 'background 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <h3 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '900', letterSpacing: '2px', color: '#fff', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
                      {muscle.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          
          /* --- VIEW 2: EXERCISE DETAILS FOR SELECTED MUSCLE --- */
          <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
              <button 
                onClick={() => setSelectedMuscle(null)}
                style={{ padding: '10px 20px', background: '#222', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#333'}
                onMouseOut={(e) => e.currentTarget.style.background = '#222'}
              >
                ← BACK TO MUSCLES
              </button>
              <h2 style={{ fontSize: '2.2rem', margin: 0, fontWeight: '900', color: '#ccff00', letterSpacing: '1px' }}>
                {selectedMuscle.name} ROUTINE
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
              {selectedMuscle.exercises.map((exercise, index) => (
                <div key={index} style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', overflow: 'hidden' }}>
                  
                  {/* Decorative glowing accent line on the left */}
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#ccff00' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                    <h3 style={{ fontSize: '1.6rem', margin: 0, fontWeight: '700', color: '#fff' }}>{index + 1}. {exercise.name}</h3>
                    <span style={{ background: '#1a2900', color: '#ccff00', padding: '6px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', border: '1px solid #ccff00' }}>
                      {exercise.sets}
                    </span>
                  </div>
                  
                  <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: '1.6', margin: 0, maxWidth: '800px' }}>
                    <strong style={{ color: '#fff' }}>Form Guide: </strong> {exercise.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Dashboard;