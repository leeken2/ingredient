import { View, Text, Input, Button, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";
import { data } from "./data";
import { useState } from "react";

const defaulePageSize = 30;
export default function Index() {
  const [step, updateStep] = useState(0);
  const [currPage, updateCurrPage] = useState(1);
  useLoad(() => {
    console.log("Page loaded.");
    console.log(data.length);
  });

  const renderSreach = () => {
    return (
      <View className="searh-page">
        <View>
          <View className="company ">公司名称</View>
          <View className="srarch mt-100">
            <View className="title">车型快查</View>
            <View className="input">
              <Input></Input>
            </View>
          </View>
          <View className="srarch">
            <View className="title">颜色名称</View>
            <View className="input">
              <Input></Input>
            </View>
          </View>
          <View className="srarch">
            <View className="title">原厂色号</View>
            <View className="input">
              <Input></Input>
            </View>
          </View>
          <View className="srarch">
            <View className="title">编号:</View>
            <View className="input">
              <Input></Input>
            </View>
          </View>
          <Button className="search-button" onClick={() => updateStep(1)}>
            查询
          </Button>
        </View>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View className="card" key={item["保鸿编号"]}>
        <View className="content">
          <View className="title">保鸿编号：</View>
          <View className="value">{item["保鸿编号"]}</View>
        </View>
        <View className="content">
          <View className="title">原厂色号：</View>
          <View className="value">{item["原厂色号"]}</View>
        </View>
        <View className="content">
          <View className="title">颜色名称：</View>
          <View className="value">{item["颜色名称"]}</View>
        </View>
        <View className="content">
          <View className="title">车名：</View>
          <View className="value">{item["车名"]}</View>
        </View>
      </View>
    );
  };

  const renderList = () => {
    return (
      <View className="searh-list">
        <View className="top">
          <Text
            onClick={(e) => {
              updateStep(0);
            }}
          >
            {"<"}
          </Text>
        </View>
        <ScrollView
          scroll-y
          className="scroll-view"
          style={{ height: "100vh" }}
        >
          {data.splice(currPage, 30).map((item) => {
            return renderItem(item);
          })}
        </ScrollView>
        <View className="bottom">
          <View
            onClick={() => {
              if (currPage > 1) {
                updateCurrPage(currPage - 1);
              }
            }}
          >
            上一页
          </View>
          <View>第{currPage}页</View>
          <View
            onClick={() => {
              if (currPage <= data.length / defaulePageSize) {
                updateCurrPage(currPage + 1);
              }
            }}
          >
            下一页
          </View>
        </View>
      </View>
    );
  };

  if (step === 0) {
    return renderSreach();
  }

  return renderList();
}
