import bcrypt from 'bcryptjs';
import pool from './connection.js';

export async function runSeeds() {
  console.log('--- Seeding Initial Configurable Data for HYDRELEX ---');
  const conn = await pool.getConnection();

  try {
    // 1. Initial Admin User
    const [adminCheck]: any = await conn.query('SELECT id FROM admins WHERE email = ?', ['admin@hydrelex.com']);
    if (adminCheck.length === 0) {
      const passwordHash = await bcrypt.hash('Hydrelex@2026!', 10);
      await conn.query(
        'INSERT INTO admins (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@hydrelex.com', passwordHash, 'SUPER_ADMIN']
      );
      console.log('✓ Initial Admin seeded: admin@hydrelex.com (Password: Hydrelex@2026!)');
    }

    // 2. Verified Company Settings
    const defaultSettings: Record<string, string> = {
      company_name: 'HYDRELEX LIFT SYSTEMS',
      tagline: 'A way to reach a goal',
      hero_headline: 'ENGINEERING VERTICAL MOBILITY.',
      hero_subheading: 'Reliable lift and elevator solutions designed to move people and materials with confidence.',
      intro_headline: 'Moving Beyond Expectations.',
      intro_text: 'HYDRELEX LIFT SYSTEMS delivers engineering-focused vertical mobility and industrial lifting solutions. Based in Sriperumbudur, Tamil Nadu, we provide durable, precision-engineered elevator systems and hydraulic machinery built for industrial, commercial, and customized structural requirements.',
      address_line1: 'No B3-G4, Arakonam Road',
      address_line2: 'Mevallurkuppam Village',
      city: 'Sriperumbudur Taluk',
      pincode: '602015',
      state: 'Tamil Nadu',
      country: 'India',
      phone_primary: '8939359592',
      phone_secondary: '9789397504',
      email: 'info@hydrelex.com',
      udyam_registration: 'UDYAM-TN-08-0090275',
      gstin: '33BNOPK2159N1ZJ',
      business_hours: 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)',
      contact_cta_headline: "LET'S MOVE YOUR PROJECT FORWARD.",
      contact_cta_subtext: "Connect with our engineering specialists in Sriperumbudur for a technical consultation tailored to your facility's vertical mobility demands.",
      social_linkedin: 'https://linkedin.com/company/hydrelex',
      social_twitter: '',
      social_facebook: '',
      social_instagram: '',
    };

    for (const [key, value] of Object.entries(defaultSettings)) {
      await conn.query(
        `INSERT INTO company_settings (setting_key, setting_value) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, value]
      );
    }
    console.log('✓ Verified company settings seeded.');

    // 3. Proposed Editable Products
    const [productsCount]: any = await conn.query('SELECT COUNT(*) as count FROM products');
    if (productsCount[0].count === 0) {
      const initialProducts = [
        {
          slug: 'passenger-lifts',
          title: 'Passenger Lifts',
          category: 'Commercial & Residential',
          short_description: 'Smooth, whisper-quiet vertical transportation engineered for residential towers and commercial buildings.',
          description: 'HYDRELEX Passenger Lifts combine structural safety with refined architectural design. Engineered for high-traffic environments, smooth jerk-free travel, and micro-level floor leveling accuracy.',
          capacity: '4 to 26 Persons (300kg – 1750kg)',
          speed: '0.65 m/s – 2.5 m/s',
          drive_system: 'Gearless PMSM / Geared Traction',
          features: JSON.stringify([
            'Microprocessor-based VVVF regenerative drive',
            'Advanced infrared door curtains for passenger protection',
            'Automatic Rescue Device (ARD) during power failure',
            'Aesthetic architectural cabin interiors in brushed stainless steel',
            'Full LED energy-efficient cabin illumination'
          ]),
          image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
          display_order: 1,
        },
        {
          slug: 'goods-lifts',
          title: 'Goods Lifts',
          category: 'Industrial',
          short_description: 'Heavy-duty cargo and freight lifting systems designed for demanding industrial operations.',
          description: 'Constructed with heavy gauge steel frames and high-tensile guide rails, our goods elevators endure intense factory floor demands, forklift loading, and continuous heavy cycle operations.',
          capacity: '500kg up to 5,000kg+',
          speed: '0.35 m/s – 0.75 m/s',
          drive_system: 'Traction Counterweighted / Heavy Hydraulic System',
          features: JSON.stringify([
            'Chequered anti-skid steel floor plate',
            'Heavy-duty collapsible or imperforate sliding shutter doors',
            'Mechanical safety gear and overload warning system',
            'Buffer spring shock absorption in elevator pit',
            'Designed for pallet trucks and forklift loading resistance'
          ]),
          image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
          display_order: 2,
        },
        {
          slug: 'hydraulic-lifts',
          title: 'Hydraulic Lifts',
          category: 'Hydraulic Engineering',
          short_description: 'High-torque hydraulic cylinder mechanism ideal for low-rise buildings and heavy payload applications.',
          description: 'HYDRELEX Hydraulic Systems utilize direct-acting or indirect-acting precision hydraulic cylinders, offering remarkable power, minimal overhead structural requirements, and exceptional stability.',
          capacity: '1,000kg to 10,000kg',
          speed: '0.2 m/s – 0.5 m/s',
          drive_system: 'High-Pressure Hydraulic Power Pack & Cylinder',
          features: JSON.stringify([
            'Requires no overhead machine room structure',
            'Low civil construction cost and pit depth flexibility',
            'Burst pipe rupture valve for immediate drop arrest',
            'Precision proportional hydraulic valve block for smooth stopping',
            'Manual descent valve in case of electrical breakdown'
          ]),
          image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
          display_order: 3,
        },
        {
          slug: 'industrial-lifting-systems',
          title: 'Industrial Lifting Systems',
          category: 'Industrial Equipment',
          short_description: 'Customized scissor lifts, dock levelers, and material handling platforms for manufacturing facilities.',
          description: 'Engineered specifically for manufacturing hubs in Sriperumbudur and industrial corridors, our specialized lifting platforms optimize production line workflows, warehousing, and logistics loading docks.',
          capacity: 'Configurable from 500kg to 20,000kg',
          speed: 'Application Specific',
          drive_system: 'Electro-Hydraulic Scissor / Mast System',
          features: JSON.stringify([
            'Heavy-gauge scissor arm mechanism with bronze bushings',
            'Hardened chrome-plated cylinder shafts',
            'Toe guards and perimeter trip safety bars',
            'Dual-station pendant or push-button remote control',
            'IP65 rated electrical enclosure for harsh factory environments'
          ]),
          image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
          display_order: 4,
        },
        {
          slug: 'customized-lift-solutions',
          title: 'Customized Lift Solutions',
          category: 'Specialized Mobility',
          short_description: 'Bespoke architectural elevators, car lifts, and panoramic glass elevator cabins tailored to your site.',
          description: 'When standard dimensions do not suffice, HYDRELEX delivers tailor-engineered solutions with customized cabin geometry, panoramic glass cladding, outdoor shaft towers, and automobile parking lifts.',
          capacity: 'Custom Engineered Specification',
          speed: 'Site Specific',
          drive_system: 'Hydraulic / MRL Traction',
          features: JSON.stringify([
            'Fully customized shaft dimensions and headroom adaptation',
            'Laminated architectural safety glass enclosures',
            'Custom RAL powder coating and hairline stainless steel trims',
            'Integrated smart access control and card reader compatibility',
            'Architectural lighting packages'
          ]),
          image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          display_order: 5,
        },
      ];

      for (const prod of initialProducts) {
        await conn.query(
          `INSERT INTO products (slug, title, category, short_description, description, capacity, speed, drive_system, features, image_url, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            prod.slug,
            prod.title,
            prod.category,
            prod.short_description,
            prod.description,
            prod.capacity,
            prod.speed,
            prod.drive_system,
            prod.features,
            prod.image_url,
            prod.display_order,
          ]
        );
      }
      console.log('✓ Proposed editable products seeded.');
    }

    // 4. Proposed Editable Services
    const [servicesCount]: any = await conn.query('SELECT COUNT(*) as count FROM services');
    if (servicesCount[0].count === 0) {
      const initialServices = [
        {
          slug: 'lift-installation',
          title: 'Lift Installation',
          short_description: 'Precision turnkey erection and commissioning by qualified vertical transportation engineers.',
          description: 'From initial site surveying, plumb-line verification, and bracket erection to guide rail alignment and electrical testing, we deliver meticulous turnkey installations conforming to national elevator standards.',
          features: JSON.stringify([
            'Comprehensive structural shaft assessment',
            'Precision laser-guided rail alignment',
            'Mechanical counterweight and cabin assembly',
            'Safety braking and emergency load test commissioning',
            'Official handover and operating staff training'
          ]),
          icon_name: 'Hammer',
          image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
          display_order: 1,
        },
        {
          slug: 'preventive-maintenance',
          title: 'Preventive Maintenance',
          short_description: 'Scheduled multi-point technical inspections to ensure maximum uptime, safety, and longevity.',
          description: 'Our preventative maintenance programs detect mechanical wear before downtime occurs. Routine lubrication, brake testing, door operator tuning, and electrical circuit diagnostics keep your lifts operating flawlessly.',
          features: JSON.stringify([
            'Multi-point mechanical and electrical checklist inspections',
            'Hydraulic oil analysis, cylinder seal, and pressure checks',
            'Traction rope tensioning and safety gear testing',
            'Priority 24/7 emergency breakdown attendance',
            'Transparent digital service reporting and logs'
          ]),
          icon_name: 'ShieldCheck',
          image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
          display_order: 2,
        },
        {
          slug: 'repair-and-servicing',
          title: 'Repair and Servicing',
          short_description: 'Rapid diagnostic troubleshooting and component replacement for all lift and hydraulic machinery brands.',
          description: 'When equipment faults occur, our industrial technicians arrive on-site with advanced diagnostic tools and genuine spares to restore safe operation with minimal downtime.',
          features: JSON.stringify([
            'Fast response breakdown troubleshooting',
            'Hydraulic pump, motor, and seal kit overhauls',
            'Control board and VVVF inverter debugging',
            'Safety switch, door lock, and wire rope replacements',
            'Certified load testing post-repair'
          ]),
          icon_name: 'Wrench',
          image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
          display_order: 3,
        },
        {
          slug: 'lift-modernization',
          title: 'Lift Modernization',
          short_description: 'Upgrade outdated elevators with modern energy-efficient drives, digital controllers, and stylish cabins.',
          description: 'Transform aging, unreliable lift systems into sleek, quiet, energy-efficient machines without rebuilding the shaft. Upgrades improve passenger safety, reduce power consumption by up to 40%, and enhance property value.',
          features: JSON.stringify([
            'VVVF regenerative drive upgrades for smooth acceleration',
            'Microcontroller and smart destination dispatch integration',
            'Cabin interior renovation with stainless steel and LED styling',
            'Compliance upgrade to modern elevator safety codes',
            'Reduced energy consumption and operational heating'
          ]),
          icon_name: 'RefreshCw',
          image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          display_order: 4,
        },
        {
          slug: 'engineering-consultation',
          title: 'Engineering Consultation',
          short_description: 'Professional vertical transportation planning, traffic analysis, and structural shaft recommendations.',
          description: 'Partner with our technical team during the architectural and civil planning phase to determine optimal lift counts, payload capacities, pit depths, and machine room configurations.',
          features: JSON.stringify([
            'Traffic analysis and passenger handling capacity modeling',
            'Shaft, pit, and overhead headroom dimensional blueprints',
            'Power requirement and structural load calculations',
            'Industrial goods handling flow optimization',
            'Custom engineering feasibility reports'
          ]),
          icon_name: 'Compass',
          image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          display_order: 5,
        },
      ];

      for (const s of initialServices) {
        await conn.query(
          `INSERT INTO services (slug, title, short_description, description, features, icon_name, image_url, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.slug, s.title, s.short_description, s.description, s.features, s.icon_name, s.image_url, s.display_order]
        );
      }
      console.log('✓ Proposed editable services seeded.');
    }

    // 5. Sample Project Placeholders (Clearly labeled per Section 4 & rule #1)
    const [projectsCount]: any = await conn.query('SELECT COUNT(*) as count FROM projects');
    if (projectsCount[0].count === 0) {
      const sampleProjects = [
        {
          title: 'Industrial Heavy Freight System [Sample Placeholder]',
          category: 'Industrial Goods Lifts',
          location: 'Manufacturing Corridor, Sriperumbudur',
          specifications: '3000kg Capacity, 4 Stops, Dual Hydraulic Ram',
          description: 'Sample engineering showcase demonstration: Heavy-duty goods lift engineered for pallet transport with anti-skid steel flooring and heavy-duty interlock protection.',
          cover_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
          is_sample: true,
          display_order: 1,
        },
        {
          title: 'Commercial Executive Passenger Elevator [Sample Placeholder]',
          category: 'Passenger Lifts',
          location: 'Corporate Tech Park, Chennai Region',
          specifications: '1000kg (13 Passengers), 1.5 m/s, Gearless PMSM',
          description: 'Sample engineering showcase demonstration: Architectural passenger elevator featuring brushed titanium gold finishes, smart destination dispatch, and acoustic isolation.',
          cover_image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
          is_sample: true,
          display_order: 2,
        },
        {
          title: 'Hydraulic Scissor Dock Leveler Platform [Sample Placeholder]',
          category: 'Hydraulic Systems',
          location: 'Logistics Warehouse, Mevallurkuppam',
          specifications: '5000kg Payload, Heavy Hydraulic Power Pack',
          description: 'Sample engineering showcase demonstration: Precision industrial scissor platform designed for continuous container loading and unlevel bay height compensation.',
          cover_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
          is_sample: true,
          display_order: 3,
        },
        {
          title: 'Bespoke Architectural Glass Lift [Sample Placeholder]',
          category: 'Customized Solutions',
          location: 'Commercial Atrium Installation',
          specifications: '800kg, Circular Laminated Glass Shaft',
          description: 'Sample engineering showcase demonstration: Custom panoramic lift structure designed to integrate with open structural steel atriums.',
          cover_image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          is_sample: true,
          display_order: 4,
        },
      ];

      for (const p of sampleProjects) {
        await conn.query(
          `INSERT INTO projects (title, category, location, specifications, description, cover_image, is_sample, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.title, p.category, p.location, p.specifications, p.description, p.cover_image, p.is_sample, p.display_order]
        );
      }
      console.log('✓ Sample project placeholders seeded (strictly tagged is_sample=true).');
    }

    console.log('--- Seeding Completed Successfully ---');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    conn.release();
  }
}

if (process.argv[1] && process.argv[1].includes('seed')) {
  runSeeds()
    .then(() => {
      console.log('Database seed completed.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
