import { useEffect, useState } from "react";
import { Space, Tag, Typography } from "antd";
import { useSearchParams } from "react-router-dom";

import useQueryParams from "hooks/userQueryParams";

const { CheckableTag: AntdCheckableTag } = Tag;
const { Title } = Typography;

interface CheckableTagProps {
  title: string;
  data: Array<string>;
}

// Display the different Filter By options in the sidebar
const CheckableTag = ({ title, data }: CheckableTagProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [, setSearchParams] = useSearchParams();

  const type = title.toLowerCase();
  const { [type]: value } = useQueryParams();

  // Update the current state for selectedTags, and update the searchParams accordingly. If there are no selectedTags, then remove field from the URL search
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    setSearchParams((prev) => {
      nextSelectedTags.length
        ? prev.set(type, nextSelectedTags.toString())
        : prev.delete(type);
      return prev;
    });
  };

  // On initial load, set the selectedTags based on the corresponding URL query parameter
  useEffect(() => {
    if (value) {
      setSelectedTags(decodeURIComponent(value).split(","));
    }
  }, [value]);

  return (
    <>
      <Title level={5} type="secondary">
        {title}:
      </Title>
      <Space size={[0, 10]} wrap>
        {data.map((tag: string) => (
          <AntdCheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </AntdCheckableTag>
        ))}
      </Space>
    </>
  );
};

export default CheckableTag;
