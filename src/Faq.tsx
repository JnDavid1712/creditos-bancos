import { motion } from 'framer-motion';
import './faq.css'

type FaqItem = {
  title: string;
  content: React.ReactNode;
  isCollapsed: boolean;
};

const FaqItemComponent: React.FC<{
  item: FaqItem;
  onToggle: () => void;
}> = ({ item, onToggle }) => (
  <div className="faq-item">
    <button onClick={onToggle} className="faq-title">
      {item.title}
    </button>
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: !item.isCollapsed ? 0 : 'auto', opacity: !item.isCollapsed ? 0 : 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden' }}
    >
      <div className="faq-content">{item.content}</div>
    </motion.div>
  </div>
);

const Faq: React.FC = (
  { data, setData }: { data: FaqItem[]; setData: React.Dispatch<React.SetStateAction<FaqItem[]>> }
) => {



  const handleToggle = (title: string) => {
    const newData = data.map((item) => {
      if (item.title === title) {
        return { ...item, isCollapsed: !item.isCollapsed };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <div className="faq">
      {data.map((item) => (
        <FaqItemComponent
          key={item.title}
          item={item}
          onToggle={() => handleToggle(item.title)}
        />
      ))}
    </div>
  );
};

export default Faq;
