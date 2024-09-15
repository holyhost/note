import { Welcome } from "@/components/Welcome/Welcome";
import { Metadata } from "next";
import { Container, Text} from "@mantine/core"

export const metadata: Metadata = {
  title: '关于',
  description: '关于小池谭记：记录笔记，积累经验，分享生活点滴，基于nextjs框架的前端项目。',
}

export default function AboutPage() {
  return (
    <Container>
      <Welcome />
      <Text>
        从小丘西行百二十步，隔篁（huáng）竹，闻水声，如鸣佩（pèi）环，心乐（lè)之。
      </Text>
      <Text>
        伐竹取道，下见小潭，水尤清冽（liè)。
      </Text>
      <Text>
        全石以为底，近岸，卷（quán ）石底以出，为坻（chí），为屿（yǔ），为嵁（kān），为岩。
      </Text>
      <Text>
        青树翠蔓（màn），蒙络（luò）摇缀（zhuì)，参（cēn）差（cī）披拂。
      </Text>
      <Text>
        潭中鱼可百许头，皆若空游无所依。
      </Text>
      <Text>
        日光下澈（chè），影布石上，佁（yǐ）然不动；俶（chù）尔远逝，往来翕（xī）忽，似与游者相乐。
      </Text>
      <Text>
        潭西南而望，斗(dǒu)折（zhé）蛇行，明灭可见。其岸势犬牙差（cī）互，不可知其源。
      </Text>
      <Text>
        坐潭上，四面竹树环合，寂寥（liáo）无人，凄神寒骨，悄（qiǎo）怆（chuàng）幽邃（suì ）。
      </Text>
      <Text>
        以其境过清，不可久居，乃记之而去。
      </Text>
      <Text>
        同游者：吴武陵，龚（gōng ）古，余弟宗玄。隶（lì）而从者，崔氏二小生：曰（yuē）恕己，曰奉壹(yī)。
      </Text>
    </Container>
  );
}
