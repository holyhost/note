import { Welcome } from "@/components/Welcome/Welcome";
import { getFileListAction } from "@/utils/action/file.action";
import { FileConfigModel } from "@/utils/model/FileConfig";
import { Text } from "@mantine/core";


export default async function HomePage() {
  const files: FileConfigModel[] = await getFileListAction()
  console.log(files)
  return (
    <>
      <Welcome />
      {files.length && files.map(item => (<Text>{item._id}-{item.title}-{item.display}</Text>))}
    </>
  );
}
