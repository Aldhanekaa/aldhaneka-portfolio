'use client';

import Select from 'react-select';
import { useSupabase } from '@/app/supabase-provider';
import { useEffect, useState } from 'react';
import { OptionI, RelationOptionI, groupedOptions } from './relations.types';
import RelationEditor from './relationEditor';

export default function ProjectRelations() {
  const { supabase } = useSupabase();

  const [tags, setTags] = useState<readonly OptionI[]>([]);
  const [groupedOptions, setGroup] = useState<groupedOptions | undefined>(
    undefined
  );

  const [relations, setRelations] = useState<RelationOptionI[]>([]);

  const fetchRequireData = async () => {
    let { data: projects_relations, error } = await supabase
      .from('projects_relations')
      .select('*');

    let newRelation: RelationOptionI[] = [];

    if (projects_relations) {
      for (let i = 0; i < projects_relations?.length; i++) {
        newRelation.push({
          name: projects_relations[i].relation_name,
          value: projects_relations[i].relation_name,
          category: projects_relations[i].category,
          tag: projects_relations[i].tag,
          type: projects_relations[i].category ? 'Categories' : 'Tags',
        });
      }
    }

    console.log('newRelation', newRelation);
    setRelations(newRelation);

    let { data: project_tags, error: tagsError } = await supabase
      .from('project_tags')
      .select('*');

    let { data: project_categories, error: categoriesError } = await supabase
      .from('project_categories')
      .select('*');

    let groupedTags: OptionI[] = [];
    let groupedCategories: OptionI[] = [];

    if (project_tags && project_categories) {
      for (let i = 0; i < project_tags?.length; i++)
        groupedTags.push({
          name: project_tags[i].tag_name,
          value: `${project_tags[i].id}.${project_tags[i].tag_name}`,
          type: 'Tags',
        });

      for (let i = 0; i < project_categories?.length; i++)
        groupedCategories.push({
          name: project_categories[i].category_name,
          value: `${project_categories[i].id}.${project_categories[i].category_name}`,
          type: 'Categories',
        });

      // @ts-ignore
      let grouped: groupedOptions = [
        { label: 'Categories', options: groupedCategories },
        {
          label: 'Tags',
          options: groupedTags,
        },
      ];
      setGroup(grouped);
      setTags(groupedTags);
    } else {
      alert('CANT FIND ONE OF THEM, CHECK CONSOLE');
      console.log('ERROR GETTING TAGS: ', JSON.stringify(tagsError));
      console.log('ERROR GETTING CTGS: ', JSON.stringify(categoriesError));
    }
  };

  useEffect(() => {
    fetchRequireData();
  }, []);

  const onDeleteCategory = async (relation_name: string) => {
    const { data, error } = await supabase
      .from('projects_relations')
      .delete()
      .eq('relation_name', relation_name);

    if (error) {
      alert('ERROR OCCURED WHEN TRY TO DEL RELATION, CHECK CONSOLE');
      console.log('ERR DEL RELATION\n', JSON.stringify(error));
    } else {
      alert('Success Deleted Relation!');
      setRelations(
        relations.filter((relation) => relation.name != relation_name)
      );
    }
  };

  const insertNewRelationIntoList = (relationObj: RelationOptionI) => {
    console.log(relationObj);
    let newRels = relations;
    newRels.push(relationObj);
    console.log('newRels', newRels);
    setRelations(newRels);
  };

  return (
    <div>
      <div className="text-lg mt-3">
        <p>
          NOTES: If you picked group family to be category, then there will be
          limit of 3 datas that will be shown.
        </p>
        <p>Click one of the list to modify the content</p>
      </div>

      <div className="w-full max-h-44 mt-16">
        {relations.map((relation, i) => (
          <div
            key={i}
            className="text-xl flex justify-between cursor-pointer bg-brand-100 px-4 py-3 rounded-lg"
          >
            <div>{relation.name}</div>
            <div
              className="text-red-600 cursor-pointer"
              onClick={() => {
                onDeleteCategory(relation.name);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
        ))}
      </div>

      <RelationEditor
        relations={relations}
        tags={tags}
        groupedOptions={groupedOptions}
        insertNewRelationIntoList={insertNewRelationIntoList}
      />
    </div>
  );
}
