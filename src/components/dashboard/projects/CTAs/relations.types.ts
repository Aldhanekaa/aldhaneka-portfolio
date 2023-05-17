export interface TagsI {
  tag_name: string;
  id: number;
}

export interface CategoryI {
  category_name: string;
  id: number;
}

export interface OptionI {
  name: string;
  value: string;
  type: string;
}

export type RelationOptionI = OptionI & {
  category: string | null;
  tag: string | null;
};

export type GroupedOption = {
  readonly label: string;
};

export type GroupedCategoriesOption = GroupedOption & {
  options: OptionI[];
};
export type GroupedTagsOption = GroupedOption & {
  options: OptionI[];
};

export type groupedOptions = GroupedCategoriesOption[] | GroupedTagsOption[];
// const groupedOptions: groupedOptions = [
//   {
//     label: 'Categories',
//     options: [],
//   },
//   { label: 'Tags', options: [] },
// ];
