import { View, Text, Input, Button, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";
import { data } from "./data";
import { useState } from "react";

export default function Index() {
  const [step, updateStep] = useState(0);
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
      <View className="card">
        <View className="content">
          <View className="title">保鸿编号：</View>
          <View className="value">{item['保鸿编号']}</View>
        </View>
        <View className="content">
          <View className="title">原厂色号：</View>
          <View className="value">{item['原厂色号']}</View>
        </View>
        <View className="content">
          <View className="title">颜色名称：</View>
          <View className="value">{item['颜色名称']}</View>
        </View>
        <View className="content">
          <View className="title">车名：</View>
          <View className="value">{item['车名']}</View>
        </View>
      </View>
    );
  };

  const renderList = () => {
    return (
      <View className="searh-list">
        <ScrollView
          scroll-y
          className="scroll-view"
          style={{ height: "100vh" }}
        >
          {data.splice(0, 10).map((item) => {
            return renderItem(item);
          })}
        </ScrollView>
      </View>
    );
  };

  if (step === 0) {
    return renderSreach();
  }

  return renderList();
}
