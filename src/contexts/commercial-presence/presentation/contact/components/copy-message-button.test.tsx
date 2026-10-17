// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyMessageButton } from "./copy-message-button";

afterEach(cleanup);

describe("prepare contact message", () => {
  it("copies the complete prepared message", async () => {
    const user = userEvent.setup();
    const write = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();
    const message = "quiero mi descuento de 20%\nMe interesa: Tarjetas";
    render(<CopyMessageButton message={message} />);
    await user.click(screen.getByRole("button", { name: "Copiar mensaje" }));
    expect(write).toHaveBeenCalledWith(message);
    expect(screen.getByRole("status").textContent).toBe("Mensaje copiado.");
  });
  it("keeps a clear manual alternative when clipboard access fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("Denied"),
    );
    render(<CopyMessageButton message="Mensaje" />);
    await user.click(screen.getByRole("button", { name: "Copiar mensaje" }));
    expect(screen.getByRole("status").textContent).toBe(
      "Selecciona y copia el mensaje.",
    );
  });
});
