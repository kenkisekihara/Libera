export type CategoryName = 'Beauty' | 'Fashion' | 'Food' | 'Drink' | 'Mrs. GREEN APPLE' | 'Events' | 'Study';

export interface Article {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
}

export const CATEGORIES = [
  { name: 'Beauty', label: '自分を慈しむ、鏡の中の哲学。', color: 'hover:bg-wine-red/12 hover:before:border-wine-red', textColor: 'group-hover:text-red-300', lineColor: 'group-hover:bg-red-300' },
  { name: 'Fashion', label: '纏うものは、意志の表明。', color: 'hover:bg-royal-blue/12 hover:before:border-royal-blue', textColor: 'group-hover:text-blue-300', lineColor: 'group-hover:bg-blue-300' },
  { name: 'Food', label: '啜る熱気、心の奥まで満たす一杯。', color: 'hover:bg-golden-yellow/12 hover:before:border-golden-yellow', textColor: 'group-hover:text-golden-yellow', lineColor: 'group-hover:bg-golden-yellow' },
  { name: 'Drink', label: '氷の音と、溶けてゆく雑念。', color: 'hover:bg-sky-blue/12 hover:before:border-sky-blue', textColor: 'group-hover:text-sky-300', lineColor: 'group-hover:bg-sky-300' },
  { name: 'Mrs. GREEN APPLE', label: '鳴り響く青、人生を彩るファンファーレ。', color: 'hover:bg-deep-green/12 hover:before:border-deep-green', textColor: 'group-hover:text-green-300', lineColor: 'group-hover:bg-green-300' },
  { name: 'Events', label: '刻まれる青春、瞬きの合間の記憶。', color: 'hover:bg-royal-purple/12 hover:before:border-royal-purple', textColor: 'group-hover:text-purple-300', lineColor: 'group-hover:bg-purple-300' },
  { name: 'Study', label: '孤独な闘い、夜明けを待つペン先。', color: 'hover:bg-white/8 hover:before:border-white/50', textColor: 'group-hover:text-white', lineColor: 'group-hover:bg-white' },
];
