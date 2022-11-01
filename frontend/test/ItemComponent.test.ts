import { mount } from "@vue/test-utils";
import ItemComponentVue from "../src/components/ItemComponent.vue";
import Item from "../src/entities/Item";

test("Deve testar o componente item", async function () {
	const item = new Item(1, "Guitarra", 1000);
	const wrapper = mount(ItemComponentVue, {
		props: {
			item
		}
	});
	expect(wrapper.get(".item-description").text()).toBe("Guitarra");
	expect(wrapper.get(".item-price").text()).toBe("1000");
});
