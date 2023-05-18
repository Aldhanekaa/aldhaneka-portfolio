'use client';
import { useEffect, useState } from 'react';
import ProjectEditor from './editor';
import { OptionI } from './CTAs/relations.types';
import { ProjectT } from '@/lib/supabase/types/index.types';

export default function ProjectEditorWrapper({
  categoriesProps,
  tagsProps,
  projectProps,
}: {
  projectProps?: ProjectT | null;
  tagsProps:
    | {
        desc: string | null;
        id: number;
        tag_name: string;
      }[]
    | null;
  categoriesProps:
    | {
        category_name: string;
        id: number;
      }[]
    | null;
}) {
  const [projectProperties, setCategories] = useState<{
    tags: readonly OptionI[];
    categories: readonly OptionI[];
  }>({
    tags: [],
    categories: [],
  });

  useEffect(() => {
    let groupedTags: OptionI[] = [];
    let groupedCategories: OptionI[] = [];

    if (tagsProps && categoriesProps) {
      for (let i = 0; i < tagsProps.length; i++)
        groupedTags.push({
          name: tagsProps[i].tag_name,
          value: `${tagsProps[i].id}.${tagsProps[i].tag_name}`,
          type: 'Tags',
        });

      for (let i = 0; i < categoriesProps?.length; i++)
        groupedCategories.push({
          name: categoriesProps[i].category_name,
          value: `${categoriesProps[i].category_name}`,
          type: 'Categories',
        });

      setCategories({
        tags: groupedTags,
        categories: groupedCategories,
      });
    }
  }, []);

  console.log('projectProps', projectProps);

  return (
    <ProjectEditor
      projectProps={projectProps}
      tags={projectProperties?.tags}
      categories={projectProperties?.categories}
    />
  );
}
