export const models = ["Lumen", "Studio", "Pulse"];

export const ratios = ["1:1", "3:4", "4:3", "16:9", "9:16"];

export const imageCounts = [1, 2, 3, 4];

export const styles = ["None", "Cinematic", "Portrait", "Analog film", "Watercolor", "Anime", "3D render"];

export const historyItems = [
  { id: "library", src: "/images/history/library.webp", alt: "Woman reading under a lamp in an old library" },
  { id: "mountain-road", src: "/images/history/mountain-road.webp", alt: "Road leading to a snowy mountain at dusk" },
  { id: "forest", src: "/images/history/forest.webp", alt: "Dark forest with glowing mushrooms" },
  { id: "mirror", src: "/images/history/mirror.webp", alt: "Blonde woman looking into a flower mirror" },
  { id: "galaxy-dress", src: "/images/history/galaxy-dress.webp", alt: "Figure made of glowing purple light in a field" },
  { id: "crystal-face", src: "/images/history/crystal-face.webp", alt: "Face wrapped in iridescent glass" },
  { id: "skincare", src: "/images/history/skincare.webp", alt: "Skincare product shot with an orchid" },
  { id: "flower-bob", src: "/images/history/flower-bob.webp", alt: "Porcelain woman with white flowers in her hair" },
  { id: "paris", src: "/images/history/paris.webp", alt: "Eiffel Tower with pink heart shaped clouds" },
  { id: "sunset-room", src: "/images/history/sunset-room.webp", alt: "Man sitting in a dark room lit by sunset" },
  { id: "night-car", src: "/images/history/night-car.webp", alt: "Woman leaning on a car at night" },
  { id: "hello-cat", src: "/images/history/hello-cat.webp", alt: "Cat holding a Hello World sign" },
  { id: "gas-station", src: "/images/history/gas-station.webp", alt: "Woman at a neon green gas station" },
  { id: "water-dancer", src: "/images/history/water-dancer.webp", alt: "Dancer standing in rippling water" },
];

const redhead = [1, 2, 3, 4].map((n) => ({
  src: `/images/generations/redhead-${n}.webp`,
  alt: "Portrait of a smiling redheaded woman in a cream sweater",
}));

const portraits = [
  { src: "/images/generations/portrait-1.jpg", alt: "Woman in a denim jacket against a blue wall" },
  { src: "/images/generations/portrait-2.jpg", alt: "Woman with long hair in soft studio light" },
  { src: "/images/generations/portrait-3.jpg", alt: "Woman with dark hair on a pink background" },
  { src: "/images/generations/portrait-4.jpg", alt: "Close up portrait on a pink background" },
];

const landscapes = [
  { src: "/images/generations/landscape-1.jpg", alt: "Misty valley at sunrise" },
  { src: "/images/generations/landscape-2.jpg", alt: "Turquoise lake between mountains" },
  { src: "/images/generations/landscape-3.jpg", alt: "Green cliffs under a cloudy sky" },
  { src: "/images/generations/landscape-4.jpg", alt: "Starry night over snowy peaks" },
];

const cats = [
  { src: "/images/generations/cat-1.jpg", alt: "Black and white cat on a green background" },
  { src: "/images/generations/cat-2.jpg", alt: "Happy cat with a yellow scarf" },
  { src: "/images/generations/cat-3.jpg", alt: "Orange cat lying on its back" },
  { src: "/images/generations/cat-4.jpg", alt: "Fluffy orange cat on a wooden table" },
];

export const imagePools = { redhead, portraits, landscapes, cats };

function toImages(generationId, pool, type = "image") {
  return pool.map((image, index) => ({
    id: `${generationId}-${index}`,
    type,
    duration: type === "video" ? `0:0${5 + index}` : null,
    ...image,
  }));
}

export const initialGenerations = [
  {
    id: "gen-redhead",
    mode: "image",
    model: "Lumen",
    ratio: "3:4",
    prompt:
      "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting",
    images: toImages("gen-redhead", redhead),
  },
  {
    id: "gen-portraits",
    mode: "image",
    model: "Studio",
    ratio: "3:4",
    prompt:
      "Editorial fashion portraits of young women, natural window light, pastel backdrops, shot on 85mm, soft skin texture, calm and confident expressions",
    images: toImages("gen-portraits", portraits),
  },
  {
    id: "gen-landscapes",
    mode: "video",
    model: "Pulse",
    ratio: "3:4",
    prompt:
      "Slow cinematic drone shots over mountain valleys and glacier lakes, early morning fog rolling between the peaks, ending on a clear starry night sky",
    images: toImages("gen-landscapes", landscapes, "video"),
  },
  {
    id: "gen-cats",
    mode: "image",
    model: "Lumen",
    ratio: "3:4",
    prompt: "Cozy lifestyle photos of cats at home, playful poses, warm afternoon light, shallow depth of field",
    images: toImages("gen-cats", cats),
  },
];
